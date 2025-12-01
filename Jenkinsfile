pipeline {
    agent any

    tools {
        nodejs 'NodeJS'  // Must match the name configured in Jenkins Global Tool Configuration
    }

    parameters {
        string(
            name: 'TARGET_URL',
            defaultValue: 'http://localhost:3000',
            description: 'Base URL of the website to test'
        )
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
                echo "Testing accessibility for: ${params.TARGET_URL}"

                // Create the test configuration file
                writeFile file: 'accessibility-tests.json', text: """[
  {
    "url": "${params.TARGET_URL}",
    "goal": "Navigate through the main page using screen reader commands and verify all content is accessible"
  },
  {
    "url": "${params.TARGET_URL}",
    "goal": "Find and navigate to all headings on the page, verify proper heading hierarchy"
  },
  {
    "url": "${params.TARGET_URL}",
    "goal": "Locate any forms on the page and verify all form inputs have proper labels"
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
