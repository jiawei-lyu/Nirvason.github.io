var productionApp = angular.module('productionApp', []);

productionApp.controller('FilterCtrl', function ($scope) {
  $scope.products = [
    { 'description': '1st Product',
      'details': 'this is the description of the first product',
      'company': 'Apple'
    },
    {
      'description': '2nd Product',
      'details': 'this is the description of the second product',
      'company': 'Apple'
    },
    {
      'description': '3rd Product',
      'details': 'this is the description of the third product',
      'company': 'Apple'
    },
    {
      'description': '4th Product',
      'details': 'this is the description of the fourth product',
      'company': 'Microsoft'
    },
    {
      'description': '5th Product',
      'details': 'this is the description of the fifth product',
      'company': 'Facebook'
    }
  ];

  $scope.setSelectedClient = function () {
    var id = this.company.id;
    if (_.contains($scope.selectedCompany, id)) {
      $scope.selectedCompany = _.without($scope.selectedCompany, id);
    } else {
      $scope.selectedCompany.push(id);
    }
      return false;
    };

    $scope.isChecked = function (id) {
      if (_.contains($scope.selectedCompany, id)) {
        return 'icon-ok pull-right';
      }
        return false;
    };

    $scope.checkAll = function () {
      $scope.selectedCompany = _.pluck($scope.companyList, 'id');
    };

});