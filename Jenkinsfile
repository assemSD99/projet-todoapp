pipeline {
    agent any

    environment {
        DOCKER_IMAGE_BACKEND = 'todoapp-backend'
        DOCKER_IMAGE_FRONTEND = 'todoapp-frontend'
        DOCKER_REPO = 'docker.io/username'
    }

    stages {
        stage('Clone Repository') {
            steps {
                echo 'Cloning repository...'
                git branch: 'main', url: 'https://github.com/assemSD99/projet-todoapp.git'
            }
        }

        stage('Build Backend') {
            steps {
                echo 'Building backend...'
                bat 'docker build -t %DOCKER_IMAGE_BACKEND% ./backend'
            }
        }

        stage('Build Frontend') {
            steps {
                echo 'Building frontend...'
                bat 'docker build -t %DOCKER_IMAGE_FRONTEND% ./frontend'
            }
        }

        stage('Push Images') {
            steps {
                echo 'Pushing Docker images to Docker Hub...'
                withCredentials([string(credentialsId: 'docker-hub-credentials', variable: 'DOCKER_PASSWORD')]) {
                    bat '''
                    echo %DOCKER_PASSWORD% | docker login -u "username" --password-stdin
                    docker tag %DOCKER_IMAGE_BACKEND% %DOCKER_REPO%/%DOCKER_IMAGE_BACKEND%:latest
                    docker tag %DOCKER_IMAGE_FRONTEND% %DOCKER_REPO%/%DOCKER_IMAGE_FRONTEND%:latest
                    docker push %DOCKER_REPO%/%DOCKER_IMAGE_BACKEND%:latest
                    docker push %DOCKER_REPO%/%DOCKER_IMAGE_FRONTEND%:latest
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                bat '''
                docker-compose down
                docker-compose up -d
                '''
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            bat 'docker system prune -f'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs for details.'
        }
    }
}
