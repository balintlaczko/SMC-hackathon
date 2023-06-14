

(
s.options.numOutputBusChannels = 32;
s.options.numInputBusChannels = 2;
s.waitForBoot{
	a = Buffer.read(s, Document.current.dir ++ "/Heartbeat.wav");
	SynthDef(\playHeartbeat, {| mul, theta, phi, pos, out|
		var env = EnvGen.kr(Env.linen(attackTime: 0.01, sustainTime: 1, releaseTime:0.01));
		var sig = PlayBuf.ar(2, a, doneAction: 2) * env * 0.5;
		sig = FoaPanB.ar(sig, theta, phi);
		// sig = FoaTransform.ar(sig, 'rtt', rotate.lag(0.02), tilt.lag(0.02), tumble.lag(0.02));
		Out.ar(out, sig)
	}).add;


	// First Order Ambisonics Decoder Synth for Lilla Salen
	SynthDef(\LSfoaDecoder, {|foaInput|
		var foa;
		foa = In.ar(foaInput, 4);
		Out.ar(0, KMHLSDome1h1pN.ar(*foa));
	}).add;

	// HRTF Decoder for Headphone monitoring
	~hrtf = FoaDecoderKernel.newListen;

	// UHJ Decoder for stereo monitoring
	~uhj = FoaDecoderKernel.newUHJ;

	s.sync;

	SynthDef(\PHfoaDecoder, {|foaInput|
		var foa;
		foa = In.ar(foaInput, 4);
		foa = FoaDecode.ar(foa, ~hrtf);
		Out.ar(0, foa);
	}).add;

	// stereo decoder
	SynthDef(\UHJfoaDecoder, {|foaInput|
		var foa;
		foa = In.ar(foaInput, 4);
		foa = FoaDecode.ar(foa, ~uhj);
		Out.ar(0, foa);
	}).add;

	~sources = Group(s);
	~foaBus = Bus.audio(s, 4);

	s.sync;

	// ~decoder = Synth.after(~sources, \LSfoaDecoder, [\foaInput, ~foaBus]);
	~decoder = Synth.after(~sources, \PHfoaDecoder, [\foaInput, ~foaBus]);
	//~decoder = Synth.after(~sources, \UHJfoaDecoder, [\foaInput, ~foaBus]);
};
)
(
~playHeartbeatAtBPM = { arg bpm;
	t.stop;
		t = Task( {
			if (bpm > 0, {
				inf.do( {
					var randAmount = 40 / bpm;
					var rand = 0.gauss(0.08 * randAmount); // gaussian centered at 0 with standard deviation of 0.02
					var mul = 0.8 + (rand * 10 / randAmount); // the amplitude value
					(((1/bpm)*60+rand)/2).wait;

					// play the heartbeat
					Synth(\playHeartbeat, [\mul, mul]);

					// wait this long
				(((1/bpm)*60+rand)/2).wait;
				} );
			} else {
			t.stop;
		} );
		} ).play;
	};
)
~playHeartbeatAtBPM.(150);

(
TempoClock.tempo = 100/60; // 200 BPM
p = Pbind(
	\instrument, \bass,
	\out, ~foaBus,
	\group, ~sources,
	\pos, 0.1,
	\freq, Pseq([60, 63, 65, 68], inf),
	\amp, Pseq([0.5, 0.6, 0.7, 0.8], inf),
	\dur, Pseq([0.5, 0.25, 0.25, 0.5], inf)
).play;
)


p.stop;

OSCFunc.trace(true);
OSCFunc.trace(false);


(
~arrayNum = 9;
~synths = Array.fill(~arrayNum); // create an empty array to keep track of running synths
OSCdef(\gyro, {|msg|
	var slot = msg[1] - 1;
	var bpm = msg[2];
	var phi = msg[3];
	var theta = msg[4];
	if (bpm > 0, {
		~synths[slot].stop;
		~synths[slot] = Task({inf.do( {
			var randAmount = 40 / bpm;
			var rand = 0.gauss(0.08 * randAmount); // gaussian centered at 0 with standard deviation of 0.02
			var mul = 0.8 + (rand * 10 / randAmount); // the amplitude value
			(((1/bpm)*60+rand)/2).wait;


			// play the heartbeat
			 Synth(\playHeartbeat, [\mul, mul, \out, ~foaBus, \phi, phi, \theta, theta]);

			// wait this long
			(((1/bpm)*60+rand)/2).wait;
		})
	}).play;
	});
	if (bpm <= 0, {
		~synths[slot].stop;
	});
}, '/gyro', recvPort: 50000);
)



OSCdef(\test, {|msg| // 1 = pitch, 2 = roll, 3 = yaw
	"Test".postln;
}, '/gyrosc/gyro', recvPort: 50000);
)