
function configureGrunt(grunt) {
  grunt.initConfig({
    jasmine_node: {
      remote: ['spec/remote_server']
    }
  });

  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.registerTask('remote', 'Run tests on a remote web service', ['jasmine_node:remote']);
}

module.exports = configureGrunt;
