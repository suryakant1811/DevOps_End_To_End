pipeline {

    agent any

    stages {

        stage("Git Clone") {
            steps {
                echo "Cloning start"
                git branch: 'main', url: 'https://github.com/suryakant1811/DevOps_End_To_End.git'
                echo "Cloning done"
            }
        }

        stage("Build Image") {
            steps {
                echo 'Building backend image'
                sh "docker build -f docker/Backend-Dockerfile -t suryasuraj/psbackend:${BUILD_NUMBER} backend"

                echo 'Building frontend image'
                sh "docker build -f docker/Frontend-Dockerfile -t suryasuraj/psfrontend:${BUILD_NUMBER} frontend"
            }
        }
    }
}