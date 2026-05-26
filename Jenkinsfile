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

        stage("SonarQube Analysis") {
            steps {
                withCredentials([string(credentialsId: 'sonarqube_token', variable: 'SONAR_TOKEN')]) {
                    sh '''
                        /opt/sonar-scanner/bin/sonar-scanner \
                        -Dsonar.projectKey=devops \
                        -Dsonar.projectName="devops" \
                        -Dsonar.sources=. \
                        -Dsonar.exclusions=node_modules/**,dist/**,build/**,.git/** \
                        -Dsonar.host.url=http://65.2.82.46:9000 \
                        -Dsonar.token=$SONAR_TOKEN
                    '''
                }
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

        // stage("Trivy Image Scan") {
        //     steps {
        //         sh '''
        //             echo "Scanning backend image..."
        //             trivy image --severity HIGH,CRITICAL --exit-code 0 suryasuraj/psbackend:${BUILD_NUMBER}

        //             echo "Scanning frontend image..."
        //             trivy image --severity HIGH,CRITICAL --exit-code 0 suryasuraj/psfrontend:${BUILD_NUMBER}
        //         '''
        //     }
        // }

        stage("Trivy Image Scan") {
    steps {
        sh '''
            rm -rf /var/lib/jenkins/.cache/trivy
            rm -rf /tmp/trivy-*

            echo "Scanning backend image..."
            trivy image --severity HIGH,CRITICAL --exit-code 0 --cache-dir /tmp/trivy-cache suryasuraj/psbackend:${BUILD_NUMBER}

            echo "Scanning frontend image..."
            trivy image --severity HIGH,CRITICAL --exit-code 0 --cache-dir /tmp/trivy-cache suryasuraj/psfrontend:${BUILD_NUMBER}
        '''
    }
}

        stage("Push Images") {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dokcerhub_cred',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push suryasuraj/psbackend:${BUILD_NUMBER}
                        docker push suryasuraj/psfrontend:${BUILD_NUMBER}
                    '''
                }
            }
        }

        stage("Deploy to Kubernetes") {
            steps {
                sh '''
                    kubectl apply -f kubernetes/

                    kubectl set image deployment/backend-deployment \
                    backend=suryasuraj/psbackend:${BUILD_NUMBER} -n default

                    kubectl set image deployment/frontend-deployment \
                    frontend=suryasuraj/psfrontend:${BUILD_NUMBER} -n default

                    kubectl rollout status deployment/backend-deployment -n default
                    kubectl rollout status deployment/frontend-deployment -n default
                '''
            }
        }
    }

    post {

        success {
            emailext(
                subject: "✅ Pipeline Success | Build #${BUILD_NUMBER}",
                mimeType: 'text/html',
                body: """
                    <html>
                    <body style="font-family: Arial, sans-serif;">
                        <h3 style="color:green;">Pipeline Executed Successfully</h3>

                        <p>The CI/CD pipeline has completed successfully.</p>

                        <p>
                        <b>Build:</b> #${BUILD_NUMBER}<br>
                        <b>Status:</b> SUCCESS<br>
                        <b>Project:</b> Product Store
                        </p>

                        <p>Regards,<br>
                        Suryakant Dwivedi</p>
                    </body>
                    </html>
                """,
                to: "surajdwivedi644@gmail.com"
            )
        }

        failure {
            emailext(
                subject: "❌ Pipeline Failed | Build #${BUILD_NUMBER}",
                mimeType: 'text/html',
                body: """
                    <html>
                    <body style="font-family: Arial, sans-serif;">
                        <h3 style="color:red;">Pipeline Execution Failed</h3>

                        <p>The CI/CD pipeline execution failed.</p>

                        <p>
                        <b>Build:</b> #${BUILD_NUMBER}<br>
                        <b>Status:</b> FAILED<br>
                        <b>Project:</b> Online Store</p>

                        <p>Please review Jenkins logs for details.</p>

                        <p>Regards,<br>
                        Suryakant Dwivedi</p>
                    </body>
                    </html>
                """,
                to: "surajdwivedi644@gmail.com"
            )
        }
    }
    
}