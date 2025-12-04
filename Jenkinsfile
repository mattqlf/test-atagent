pipeline {
    agent any

    tools {
        nodejs 'NodeJS'  // Must match the name configured in Jenkins Global Tool Configuration
    }

    environment {
        TARGET_URL = 'http://localhost:3000'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Start Server') {
            steps {
                sh 'nohup npm start > server.log 2>&1 &'
                sh 'sleep 3'
                echo 'Test server started on http://localhost:3000'
            }
        }

        stage('Setup Tests') {
            steps {
                echo "Testing accessibility for: ${TARGET_URL}"

                // Create the test configuration file
                writeFile file: 'accessibility-tests.json', text: """[
  {
    "url": "${TARGET_URL}",
    "goal": "Find the newsletter signup form and verify the email input has a proper label"
  },
  {
    "url": "${TARGET_URL}/products",
    "goal": "Check if the sort dropdown has a proper label for screen reader users"
  },
  {
    "url": "${TARGET_URL}/contact",
    "goal": "Navigate the contact form and verify all form inputs have associated labels"
  }
]"""
            }
        }

        stage('Accessibility Tests') {
            steps {
                accessibilityAgent(
                    testConfigFile: 'accessibility-tests.json',
                    continueOnFailure: true,
                    failBuildOnTestFailure: true
                )
            }
        }
    }

    post {
        always {
            sh 'pkill -f "node server.js" || true'
            echo 'Accessibility testing complete. Check the "Accessibility Test Results" link in the build sidebar.'
        }
        success {
            echo 'All accessibility tests passed!'
        }
        failure {
            echo 'Some accessibility tests failed. Review the dashboard for details.'
        }
    }
}
