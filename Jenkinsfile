
pipeline {
    agent any

    tools {
        nodejs 'NodeJS-22'
    }

    options {
        skipDefaultCheckout(true)
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Automated Testing') {
            steps {
                sh 'npm test'
            }
        }
    }

    post {
        success {
            echo 'CI berhasil: aplikasi lolos testing.'
        }

        failure {
            echo 'CI gagal: periksa log pipeline.'
        }
    }
}
