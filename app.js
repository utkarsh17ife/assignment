(function() {
var app = angular.module('myApp',['ui.router']);
app.config(RoutesConfig);
app.controller('page1Controller',page1Controller);
app.controller('page2Controller',page2Controller);
app.service('dataService',dataService);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

	function RoutesConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');
    
        $stateProvider

        .state('page1', {
            url: '/',
            templateUrl: 'views/page1.html'
        })
        .state('page2', {
            url: '/page2/',
            templateUrl: 'views/page2.html',
            params: {data: null}
            });
			
    }
	
	function page1Controller($scope,$state,dataService){

        selected = []	
		$scope.tableDate = dataService.getData();

        $scope.select = function(id){
            selectCheck = 0;
            for(i = 0; i<=selected.length; i++){
                if(id == selected[i]){
                    selectCheck = 1;
                }
            }
            if(selectCheck == 1){
                var index = selected.indexOf(id);
                selected.splice(index, 1); 
            }else{
                selected.push(id);
            }
        };
        $scope.show = function (){
            if(selected.length === 0){
                alert("no row selected");
            } else {
                console.log(selected);
                 $state.go("page2",  { data: selected });
            }
        };
	};

    function page2Controller($scope,$state,$stateParams,dataService){
        console.log($state.params.data);
        $scope.studentIds = $stateParams.data;
    }

    function dataService(){
        var service = this;
        tableDate = [
			{student_id: 1, student_name: "student1"},
			{student_id: 2, student_name: "student2"},
			{student_id: 3, student_name: "student3"},
			{student_id: 4, student_name: "student4"},
		];

         service.getData = function(){
            return tableDate;
        };
    }
})();

