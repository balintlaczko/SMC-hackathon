

(
s.options.numOutputBusChannels = 32;
s.options.numInputBusChannels = 2;
s.waitForBoot{

	SynthDef(\bass, { |out, freq = 120, amp = 0.3, gate = 1, pos = 0, rotate = 0, tilt = 0, tumble = 0|
		var env, sig;
		env = EnvGen.ar(Env.perc, gate, doneAction: 2);
		sig = SinOsc.ar(freq, mul: env * amp);
		sig = FoaEncode.ar(sig, FoaEncoderMatrix.newDirection(0, 0));
		sig = FoaTransform.ar(sig, 'rtt', rotate.lag(0.02), tilt.lag(0.02), tumble.lag(0.02));

		Out.ar(0, sig);
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

x = Synth(\bass, [\buf, b, \out, ~foaBus, \pos, 0.1, \freq, Pseq([60, 63, 65, 68], inf), \dur, Pseq([0.5, 0.25, 0.25, 0.5], inf, \rate, rrand(1.0, 2.0))]);
x.free;



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
OSCdef(\gyro, {|msg|
	~sources.set(
		\freq, msg[1],
		\amp, msg[2],
		\dur, msg[3]
	);
}, '/gyro', recvPort: 50000);
)