pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "projet" // Nom de l'image Docker (sans le préfixe utilisateur)
        DOCKER_TAG = "latest" // Tag de l'image Docker
    }

    stages {
        stage('Checkout') {
            steps {
                // Récupérer le code source depuis le référentiel Git configuré dans le pipeline
                checkout scm
            }
        }

        stage('Build') {
            steps {
                dir('backend') { 
                    // Compiler et générer les artefacts du backend
                    bat './mvnw clean install'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                // Construire l'image Docker à partir du Dockerfile
                bat "docker build -t ${env.DOCKER_USER}/${DOCKER_IMAGE}:${DOCKER_TAG} -f backend/Dockerfile backend"
            }
        }

        stage('Push Docker Image') {
            steps {
                // Utiliser les credentials pour se connecter à Docker Hub et pousser l'image
                withCredentials([usernamePassword(credentialsId: 'docker-hub-token', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    script {
                        bat """
                            docker login -u "${DOCKER_USER}" -p "${DOCKER_PASS}"
                            docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_USER}/${DOCKER_IMAGE}:${DOCKER_TAG}
                            docker push ${DOCKER_USER}/${DOCKER_IMAGE}:${DOCKER_TAG}
                        """
                    }
                }
            }
        }
    }

    post {
        // Actions exécutées à la fin du pipeline
        always {
            echo 'Pipeline terminé.'
        }
        success {
            echo 'Pipeline exécuté avec succès.'
        }
        failure {
            echo 'Pipeline échoué.'
        }
    }
}
