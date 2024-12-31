pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "assemsaadaoui/projet" // Nom de l'image Docker
        DOCKER_TAG = "latest" // Tag de l'image Docker
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm // Récupère le code source depuis le référentiel Git configuré
            }
        }

        stage('Build') {
            steps {
                dir('backend') { // Accède au répertoire backend
                    bat './mvnw clean install' // Compile et génère les artefacts du backend
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} -f backend/Dockerfile backend" // Construit l'image Docker
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-token', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat """
                          docker login -u "${DOCKER_USER}" -p "${DOCKER_PASS}"
                          docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_USER}/${DOCKER_IMAGE}:${DOCKER_TAG}
                          docker push ${DOCKER_USER}/${DOCKER_IMAGE}:${DOCKER_TAG}
                    """
                }
            }
        }
    }

    post {
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
