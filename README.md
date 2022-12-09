# TeleSign Full-service Node.js SDK

[Telesign](https://telesign.com) connects, protects, and defends the customer experience with intelligence from billions of digital interactions and mobile signals. Through developer-friendly APIs that deliver user verification, digital identity, and omnichannel communications, we help the world's largest brands secure onboarding, maintain account integrity, prevent fraud, and streamline omnichannel engagement.

## Requirements

* **Node.js 6+**
* **npm** *(Optional)* - This package manager isn't required to use this SDK, but it is required to use the installation instructions below.

> **NOTE:**
> 
> These instructions are for MacOS. They will need to be adapted if you are installing on Windows.

## Installation

Follow these steps to add this SDK as a dependency to your project. Both the Telesign Full-service Node.js SDK and the Telesign Self-service Node.js SDK are installed because the Full-service SDK also uses some functionality in the Self-service SDK.

1. Create a new directory to download the Telesign SDK. This should not be in the same directory as where you build your integration.

```
    cd ~/code/local
    mkdir telesign_sdks
    cd telesign_sdks
```


2. Clone this repo. A new directory should appear called `node_telesign_enterprise`:

   `git clone https://github.com/TeleSign/node_telesign_enterprise.git`
 
3. Create another directory (this must be outside of the SDK directory you just created) where you want to create your Telesign integration. Skip this step if you already have created a project. If you plan to create multiple Node.js projects that use Telesign, we recommend that you group them within a `telesign_integrations` directory.

```
    cd ~/code/local
    mkdir telesign_integrations
    cd telesign_integrations
    mkdir {your project name}
    cd {your project name}
```

4.  Install the SDK as a dependency in this new integration directory using the command below. It references the path to where you downloaded the SDK. You should see a message in the terminal notifying you that you have successfully installed the SDK. (Edit the path in the command below if you are using an existing project directory):

   `npm install ~/code/local/telesign_sdks/node_telesign_enterprise --save`

5. In your integration code, reference the package name "telesignenterprisesdk". You don't have to directly reference the full path to the SDK:

   `const TelesignSDK = require('telesignenterprisesdk');`


## Authentication

If you use a Telesign SDK to make your request, authentication is handled behind-the-scenes for you. All you need to provide is your Customer ID and API Key. The SDKs apply Digest authentication whenever they make a request to a Telesign service where it is supported. When Digest authentication is not supported, the SDKs apply Basic authentication.

## What's next

* Learn to send a request to Telesign with code with one of our [tutorials](https://developer.telesign.com/enterprise/docs/tutorials).
* Browse our [Developer Portal](https://developer.telesign.com) for tutorials, how-to guides, reference content, and more.
* Check out our [sample code](https://github.com/TeleSign/sample_code) on GitHub.