define(function(require) {

    var assert = require('chai').assert;
    var object = require('../src/object');

    suite("super");

    test('super can be called within public methods', function() {
	    var animal = object.subclass(function(that, my) {
		    my.initialize = function(spec) {
				my.super();
				my.name = spec.name;
			};
			that.getName = function() {
				return my.name;
			};
		});

	    var dog = animal.subclass(function(that, my) {
			that.getName = function() {
				return 'dog named ' + that.super();
			};
		});

		var milou = dog({name: 'milou'});

		assert.equal(milou.getName(), 'dog named milou');
    });

	test('super can be called within protected methods', function() {
		var animal = object.subclass(function(that, my) {
			my.initialize = function(spec) {
				my.super();
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
				return 'dog named ' + my.super();
			};
		});

		var milou = dog({name: 'milou'});

		assert.equal(milou.toString(), 'dog named milou');
    });

	test('super rebinds calls to that correctly', function() {
		var animal = object.subclass(function(that, my) {

			that.toString = function() {
				return my.getName();
			};

			my.getName = function() {
				return my.name;
			};
		});

		var dog = animal.subclass(function(that, my) {
			that.toString = function() {
				return 'a dog named: ' + that.super();
			};

			my.getName = function() {
				return 'milou';
			};
		});

		var milou = dog();

		assert.equal(milou.toString(), 'a dog named: milou');
	});

	test('super can be used with arguments', function() {
		var animal = object.subclass(function(that, my) {

			that.foo = function(number) {
				return number;
			};
		});

		var dog = animal.subclass(function(that, my) {
			that.foo = function(number) {
				return that.super(number) + 1;
			};
		});

		var milou = dog();
		var foo = milou.foo(4);

		assert.equal(foo, 5);
	});
});
