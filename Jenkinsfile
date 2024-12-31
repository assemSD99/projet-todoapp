pipeline {
    agent any

    environment {
        // Identifiants pour Docker Hub (remplacez 'docker-hub-token' par l'ID réel de vos credentials Jenkins)
        DOCKERHUB_CREDENTIALS = credentials('docker-hub-token')
        DOCKER_IMAGE = "assemsaadaoui/projet" // Nom de l'image Docker (Docker Hub)
        DOCKER_TAG = "latest" // Tag de l'image Docker (modifiable)
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
                // Utilisation sécurisée des credentials pour Docker Hub
                withCredentials([usernamePassword(credentialsId: 'docker-hub-token', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    bat """
                    echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin
                    docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
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
