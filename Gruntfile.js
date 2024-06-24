const { option, task } = require("grunt");

module.exports = function(grunt) {
    grunt.initConfig ({ /*configurando as tarefas*/
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: { /*AMBIENTE DO DEV, AMBIENTE LOCAL, NOSSA MAQUINA*/
                files: {
                    'dev/styles/main.css': 'src/styles/main.less'
                }
            },
            production: { /*AMBIENTE DA INTERNET, DISPONIVEL VIA LINK*/
                options: {
                    compress: true,
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less'
                }
            }  
        },
        watch: {
            less: {
                files: ['src/styles/**/*.less'], /* **=qq pasta, *=qq arquivo*/
                tasks: ['less:development']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },
        replace: { /*para substituir o caminho do endereço do css no html, já que precisa de um para o ambiente de dev e outro pro de prod*/
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: '../src/scripts/main.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.min.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: './scripts/main.min.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        htmlmin: { /*minificar o html*/
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                },
                files: {
                    'prebuild/index.html': 'src/index.html'
                }
            }
        },
        clean: ['prebuild'], /*remover o arquivo prebuild quando executar a tarefa*/
        uglify: {
            target: {
                files: {
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
                }
            }
        }
    })

/*ACRESCENTANDO A FUNÇÃO*/
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['watch']); /*DEFAULT É A TAREFA "PRINCIPAL"*/
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean', 'ugligy']); /*para adicionar as execuções das tarefas ao chamar a função "build"*/
}