function ConverterCtrl($scope) {
  $scope.rules = angular.copy(BootstrapUpgrader.rules);
  $scope.source = 
    '<!doctype html>\n' +
    '<html>\n' +
    '  <head>\n' +
    '    <title>Example</title>\n' +
    '    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">\n' +
    '  </head>\n' +
    '  <body>\n' +
    '    <div class="container-fluid">\n' +
    '      <div class="row">\n' +
    '        <div class="col-md-12">\n' +
    '          <h1>Hello world!</h1>\n' +
     '       </div>\n' +
	'		<div class="panel panel-default">\n' +
	'          <img src="http://getbootstrap.com/assets/img/devices.png" class="img-responsive" alt="bootstrap">\n' +
	'		<div class="panel-body">\n' +
    ' 			Panel is now Card\n' +
	'		</div>\n' +
	'		</div>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </body>\n' +
    '</html>\n';
  
  $scope.result = "";
  
  $scope.runRules = function() {
    var report = BootstrapUpgrader.perform($scope.source, true);
    $scope.result = report.output;
    for (var i = 0; i < report.results.length; i++) {
      $scope.rules[i].runMessage = report.results[i] || "No Changes";
    }
    $scope.hasRun = true;
  }
}