pipeline {
  agent any

  environment {
    IMAGE_NAME = "astro-app"
    CONTAINER_NAME = "astro-app"
    PORT = "8086"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Build Astro') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Docker Build') {
      steps {
        sh 'docker build -t ${IMAGE_NAME}:latest .'
      }
    }

    stage('Deploy') {
      steps {
        sh '''
          docker stop ${CONTAINER_NAME} || true
          docker rm ${CONTAINER_NAME} || true
          docker run -d --name ${CONTAINER_NAME} \
            -e HOST=0.0.0.0 \
            -e PORT=4321 \
            -p 8086:4321 \
            ${IMAGE_NAME}:latest
        '''
      }
    }
  }
}
