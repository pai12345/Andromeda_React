pipeline{
    // agent {
    //     docker { 
    //         image 'node:lts' 
    //         args '-p 5000:5000'
    //         } 
    // }
    agent any
    options {
        timeout(time: 5, unit: 'MINUTES') 
        skipDefaultCheckout true
    }  
    tools {nodejs "nodejs"}
    stages{
        stage('Cloning Repository'){
          steps{     
            script {
                  Exception caughtException = null
                  catchError(buildResult: 'SUCCESS', stageResult: 'ABORTED') { 
                    try { 
                        echo "Cloning Repo"
                        git credentialsId: 'github-credential', url: 'https://github.com/pai12345/Andromeda_React.git'  
                    } catch (Throwable e) {
                        caughtException = e
                    }
                  }
                  if (caughtException) {
                        error caughtException.message
                    }
            }
          }
        }
        stage('Build'){
          steps{
            script {
                  Exception caughtException = null
                  catchError(buildResult: 'SUCCESS', stageResult: 'ABORTED') { 
                  try { 
                    sh '''
                       npm ci
                       npm audit fix
                       npm run build    
                      '''
                  } catch (Throwable e) {
                      caughtException = e
                    }                  
                  }
                   if (caughtException) {
                        error caughtException.message
                    }
            }
          }
        }
    }
    post {
        always {
          echo "Cleaning Workspace"
          cleanWs()
        }
    }
}