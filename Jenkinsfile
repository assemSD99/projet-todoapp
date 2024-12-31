pipeline {
    agent any

    environment {
        // Identifiants pour Docker Hub (remplacez 'docker-hub-token' par l'ID réel de vos credentials Jenkins)
        DOCKER_IMAGE = "assemsaadaoui/projet" // Nom de l'image Docker
        DOCKER_TAG = "latest" // Tag de l'image Docker
    }

    stages {
        // Étape 1 : Checkout du code source
        stage('Checkout') {
            steps {
                checkout scm // Récupère le code source depuis le référentiel Git configuré
            }
        }

        // Étape 2 : Construction du projet backend
        stage('Build') {
            steps {
                dir('backend') { // Accède au répertoire backend
                    bat './mvnw clean install' // Compile et génère les artefacts du backend
                }
            }
        }

        // Étape 3 : Construction de l'image Docker
        stage('Build Docker Image') {
            steps {
                bat "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} -f backend/Dockerfile backend" // Construit l'image Docker
            }
        }

        // Étape 4 : Pousser l'image Docker vers Docker Hub
        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh """
                          docker login docker.io -u "$DOCKER_USER" -p "$DOCKER_PASS"
                          docker tag ${DOCKER_IMAGE}:latest "$DOCKER_USER"/${DOCKER_IMAGE}:latest
                          docker push "$DOCKER_USER"/${DOCKER_REPO}
                    """
                }
            }
        }

    }

    // Post-actions : Exécutées après le pipeline
    post {
        always {
            echo 'Pipeline terminé.' // Toujours afficher ce message
        }
        success {
            echo 'Pipeline exécuté avec succès.' // En cas de succès
        }
        failure {
            echo 'Pipeline échoué.' // En cas d'échec
        }
    }
}
