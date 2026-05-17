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

       stage("Push Images") {
    
        steps {
            withCredentials([
                usernamePassword(
                    credentialsId: 'dockerhub_cred',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )
            ]) 
            {
                sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    docker push suryasuraj/psbackend:${BUILD_NUMBER}
                    docker push suryasuraj/psfrontend:${BUILD_NUMBER}
                '''
                }
            }
        }  

        stage("tst"){
            steps{
                echo "working"
            }
        }

        // stage("Deploy to Kubernetes") {
        //     steps {
        //         sh '''
        //         kubectl set image deployment/backend-deployment \
        //         backend=suryasuraj/psbackend:${BUILD_NUMBER} -n default

        //         kubectl set image deployment/frontend-deployment \
        //         frontend=suryasuraj/psfrontend:${BUILD_NUMBER} -n default

        //         kubectl rollout status deployment/backend-deployment -n default

        //         kubectl rollout status deployment/frontend-deployment -n default
        //     '''
        // }
    }

    }
}