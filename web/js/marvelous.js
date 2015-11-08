(function(window, angular) {
	var app = angular.module('marvelous', []);

	/**
	 * marvelous controller
	 */
	app.controller('marvelousCtrl', function($scope) {
		$scope.columnOpen = false;
		$scope.columns = getCache() || [ {
			idx : 0,
			name : 'COLUMN 1',
			items : []
		}, {
			idx : 1,
			name : 'COLUMN 2',
			items : []
		} ];

		// show or hide column select
		$scope.toggleColumn = function() {
			$scope.columnOpen = !$scope.columnOpen;
		};

		// set selected column
		$scope.setColumn = function(col) {
			$scope.column = col;
			$scope.columnOpen = false;
		};

		// add item to list
		$scope.addItem = function() {
			if (!$scope.name || !$scope.column) {
				return;
			}
			$scope.columns[$scope.column.idx].items.push({
				idx : $scope.columns[$scope.column.idx].items.length,
				name : $scope.name,
				columnIdx : $scope.column.idx
			});
			$scope.name = '';
			setCache($scope.columns);
		};

		// del item from list
		$scope.delItem = function(item) {
			$scope.columns[item.columnIdx].items.splice(item.idx, 1);
			setCache($scope.columns);
		};

		// get data from local cache
		function getCache() {
			var columns = null;
			if (window.localStorage) {
				var str = localStorage.getItem('columns');
				try {
					columns = angular.fromJson(str);
				} catch (e) {
					columns = null;
				}
			}
			return columns;
		}

		// set data to local cache
		function setCache(columns) {
			if (window.localStorage) {
				localStorage.setItem('columns', angular.toJson(columns));
			}
		}
	});
})(window, window.angular);