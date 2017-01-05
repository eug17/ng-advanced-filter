(function() {
    'use strict';

    angular.module('yFilter')    
    .filter('yFilter', function() {
        return function(a, query, b) {
            // a - innitial short array
            // b - full list
            var array;
            array = a;
            if(b){
                array = b;
            }
            var newQuery = query && query.trim().split(/\s+/);
            if(angular.isDefined(array) && array.length > 0){
                var keys = Object.keys(array[0]);
            }
            
            if(!newQuery || !newQuery.length) 
                return a;
            if(query.length < 3)
                return a;
            // in big arrays to start request after 3th character
            return array.filter(function(obj) {
                return newQuery.every(function(q) {
                    return keys.some(function(key) {
                        if(Array.isArray(obj[key])){
                            return JSON.stringify(obj[key]).toLowerCase().indexOf(q.toLowerCase()) > -1;
                        }else{
                            return String(obj[key]).toLowerCase().indexOf(q.toLowerCase()) > -1;
                        }
                    });
                });
            });
        };
    });
})();
