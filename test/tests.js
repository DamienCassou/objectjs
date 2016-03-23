var pathPrefix = "../test/";
var testModules = [
	"./src/allSubclassesSpec",
	"./src/classInheritanceSpec",
	"./src/classReferenceSpec",
	"./src/extensionSpec",
	"./src/inheritanceSpec",
	"./src/initializationSpec",
	"./src/subclassCreationSpec",
	"./src/superSpec"
];

testModules = testModules.map(function(each) {
	return pathPrefix + each;
});

require.config({
	baseUrl: "../src"
});

require(testModules, function() {
	jasmine.getEnv().execute();
});
