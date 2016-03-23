define(["object"], function(object) {

	describe("inheritance", function() {

		it("Methods should be inherited", function() {
			var animal = object.subclass(function(that, my) {
				my.initialize = function(spec) {
					my.name = spec.name;
				};
				that.getName = function() {
					return my.name;
				};
				that.toString = function() {
					return that.getName();
				};
			});

			var dog = animal.subclass(function(that, my) {});

			var milou = dog({name: "milou"});

			expect(milou.toString()).toEqual("milou");
		});

		it("Methods can be overridden", function() {
			var animal = object.subclass(function(that, my) {
				my.initialize = function(spec) {
					my.name = spec.name;
				};
				that.getName = function() {
					return my.name;
				};
				that.toString = function() {
					return that.getName();
				};
			});

			var dog = animal.subclass(function(that, my) {
				that.getName = function() {
					return "Woof";
				};
			});

			var milou = dog({name: "milou"});

			expect(milou.toString()).toEqual("Woof");
		});

		it("Protected methods should be inherited", function() {
			var animal = object.subclass(function(that, my) {
				my.initialize = function(spec) {
					my.name = spec.name;
				};
				that.toString = function() {
					return my.getName();
				};
				my.getName = function() {
					return my.name;
				};
			});

			var dog = animal.subclass(function(that, my) {});

			var milou = dog({name: "milou"});

			expect(milou.toString()).toEqual("milou");
		});

		it("Protected methods can be overridden", function() {
			var animal = object.subclass(function(that, my) {
				my.initialize = function(spec) {
					my.name = spec.name;
				};
				that.toString = function() {
					return my.getName();
				};
				my.getName = function() {
					return my.name;
				};
			});

			var dog = animal.subclass(function(that, my) {
				my.getName = function() {
					return "Woof";
				};
			});

			var milou = dog({name: "milou"});

			expect(milou.toString()).toEqual("Woof");
		});
	});
});
