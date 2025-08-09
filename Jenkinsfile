// Build
String awsEcrAccount = "${env.AWS_ACCOUNT_ID}"
String awsEcrRegion = "${env.AWS_ECR_REGION}"
String projectRepo = "${env.PROJECT_REPO}" 

// Build & Deploy
String publishVersion = "${env.BUILD_ID}"
String envKey = "${env.ENV_KEY}"
String imageURL = "${awsEcrAccount}.dkr.ecr.${awsEcrRegion}.amazonaws.com/${projectRepo}"

pipeline {
    agent none
    stages {
        // Baixar imagem base desenvolvimentoham/modelapi
        // stage('Pull Docker Image') {
        //     agent {
        //         label 'built-in'
        //     }
        //     steps {
        //         script {
        //             docker.withRegistry('https://index.docker.io/v1/', 'DOCKERHUB_HAM') {
        //                 echo "Attempting to pull Docker image desenvolvimentoham/modelapi:latest"
        //                 sh "docker pull desenvolvimentoham/modelapi:latest"
        //             }
        //         }
        //     }
        // }
        stage('Clone Repository and Pull Base Image') {
            agent {
                label 'built-in'
            }
            steps {
                script {
                    checkout scm
                }
            }
        }
        stage('Build Docker Image') {
            agent {
                label 'built-in'
            }
            steps {
                script {
                    sh "docker build -t ${projectRepo}:latest -f Dockerfile ."
                }
            }
        }
        stage('Push to ECR') {
            agent {
                label 'built-in'
            }
            steps {
                node('built-in') {
                    script {
                        sh "aws ecr get-login-password --region ${awsEcrRegion} | docker login --username AWS --password-stdin ${awsEcrAccount}.dkr.ecr.${awsEcrRegion}.amazonaws.com"
                        sh "docker tag ${projectRepo}:latest ${awsEcrAccount}.dkr.ecr.${awsEcrRegion}.amazonaws.com/${projectRepo}:${envKey}-${publishVersion}"
                        sh "docker push ${awsEcrAccount}.dkr.ecr.${awsEcrRegion}.amazonaws.com/${projectRepo}:${envKey}-${publishVersion}"
                        sh "docker rmi -f ${projectRepo}:latest || :"
                        sh "docker rmi -f ${projectRepo}:${envKey}-${publishVersion} || :"
                    }
                }
            }
        }
        stage('Deploy to Kubernetes') {
          agent {
              label 'built-in' 
          }
          steps {
              script {
                  checkout scm
                  sh "helm upgrade ${projectRepo} --install ham-chart/ham-chart  -f ./devops/values.yaml --set image.repository=${imageURL} --set image.tag=${envKey}-${publishVersion} --debug --wait --timeout 600s"
              }
          }
        }
    }
}