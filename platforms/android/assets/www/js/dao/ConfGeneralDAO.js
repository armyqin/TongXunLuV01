var db =  null;

// angular.module('com.tts.dao', ['ngCordova'])

App.factory('confGeneralDAO', function($cordovaSQLite, $q){
	var confGeneralDAO = {};

	confGeneralDAO.openTongXunLuDB = function(){
		console.log("Create Or Open Database!!!!!");
		db = $cordovaSQLite.openDB({name: "tongxunlu.db", bgType: 1});
	};

	confGeneralDAO.createTable = function(){
		console.log("Create conf_general Table!!!!!");
		$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS conf_general (param_name text primary key, param_value text, param_desc text, update_time datetime)");
	};

	confGeneralDAO.initData = function(){
		console.log("Init conf_general Data!!!!!");
		var initData = {param_name: 'DB_VERSION', param_value: '1', param_desc: 'version of structure and library'};
		return confGeneralDAO.insert(initData);
	};

	confGeneralDAO.insert = function(obj){
		var query = "INSERT INTO conf_general(param_name, param_value, param_desc, update_time) VALUES (?, ?, ?, ?)";
		var deferred = $q.defer();
	    $cordovaSQLite.execute(db, query, [obj.param_name, obj.param_value, obj.param_desc, new Date()])
	    .then(function(res){
	      console.log("confGeneralDAO INSERT ID --> " + res.insertId);
	      deferred.resolve(res.insertId);
	    }, function(err){
	      console.log(err);
	      deferred.reject('-1');
	    });
	    return deferred.promise;
	};

	confGeneralDAO.update = function(obj){
		var query = "UPDATE conf_general SET param_value = ?, update_time = ? WHERE param_name = ?";
		var deferred = $q.defer();
	    $cordovaSQLite.execute(db, query, [obj.param_value, new Date(), obj.param_name])
	    .then(function(res){
	     	console.log("confGeneralDAO UPDATE rowsAffected --> " + res.rowsAffected);
	     	deferred.resolve(res.rowsAffected);
	    }, function(err){
	      	console.log(err);
	      	deferred.reject('-1');
	    });
	    return deferred.promise;
	};

	confGeneralDAO.selectByParamName = function(paramName){
		var query = "SELECT param_name, param_value, param_desc, update_time FROM conf_general WHERE param_name = ?";
		var deferred = $q.defer();
		$cordovaSQLite.execute(db, query, [paramName])
		.then(function(res){
			if(res.rows.length > 0){
				deferred.resolve(res.rows.item(0));
			}else{
				console.log("confGeneralDAO - No results found");
				deferred.reject('No results found');
			}
		}, function(err){
			console.log(err);
			deferred.reject('No results found');
		});
		return deferred.promise;
	};

	confGeneralDAO.selectSqlVersionByParamName = function(paramName){
		var query = "SELECT param_value FROM conf_general WHERE param_name = ?";
		var deferred = $q.defer();
		$cordovaSQLite.execute(db, query, [paramName])
		.then(function(res){
			if(res.rows.length > 0){
				console.log('selectSqlVersionByParamName --> param_value: ' + res.rows.item(0).param_value);
				deferred.resolve(res.rows.item(0).param_value);
				// return res.rows.item(0).param_value;
			}else{
				console.log("confGeneralDAO - No results found");
				deferred.resolve('-1');
				// return null;
			}
		}, function(err){
			console.log(err);
			deferred.reject('-2');
		});
		return deferred.promise;
	};

	return confGeneralDAO;
});