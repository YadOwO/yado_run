---
app: Yado Asset
title: Third-Party Sharing List
updated: 2026-11-09
effective: 2026-11-09
---

This list is part of our [Privacy Policy](/legal/yadoa/privacy/). It covers every case in which the App provides personal information to third parties or has it processed by service providers, and every third-party library in the App.

When the list changes, we update this page and the date at the top. **If we add a new recipient, we will ask for your permission again before you next use the related feature.**

## 1. AI model providers

AI bookkeeping needs a large language model to understand what you say and the images you send. Depending on the model tier you choose, the request (for example, whether it includes an image) and each provider's availability, we use one or more of the providers below. **We will ask for your explicit permission before you first use AI bookkeeping. If you don't use AI bookkeeping, nothing is sent to these providers.**

**What is sent** (the same for every provider):

- The text of what you said or typed, and images you send;
- Your account list (name, type, balance, whether inactive) and category list;
- The context of the conversation, including transactions and recurring rules the AI looked up to answer you;
- The current time, time zone and App language.

**Never sent:** your account ID, nickname, email, device identifier or IP address. Our server sends the information over an encrypted connection; the provider uses it to produce the result and processes it under its own terms and privacy policy.

| Provider | Operated by | Location | Used for users in | Website |
| --- | --- | --- | --- | --- |
| Alibaba Cloud Model Studio (Bailian) | Alibaba Cloud Computing Co., Ltd. | China | All regions | [aliyun.com](https://www.aliyun.com) |
| DeepSeek Open Platform | Hangzhou DeepSeek Artificial Intelligence Basic Technology Research Co., Ltd. | China | All regions | [deepseek.com](https://www.deepseek.com) |
| Volcano Engine Ark (Doubao models) | Beijing Volcano Engine Technology Co., Ltd. | China | All regions | [volcengine.com](https://www.volcengine.com) |

## 2. Sign-in and system services

| Third party | Operated by | When | Information | Notes |
| --- | --- | --- | --- | --- |
| Sign in with Apple | Apple Inc. | When you choose to sign in with Apple | Your Apple identifier, and the name and email you choose to share (which may be an Apple relay address) | Apple verifies your identity and provides this information to us |
| Apple speech recognition | Apple Inc. | Voice bookkeeping on devices or iOS versions without on-device recognition | Your speech | Sent by iOS directly to Apple; we are not involved and never receive the audio |

These services are covered by [Apple's Privacy Policy](https://www.apple.com/legal/privacy/).

## 3. Service providers (cloud)

| Service provider | Operated by | Purpose | Information | Location |
| --- | --- | --- | --- | --- |
| Alibaba Cloud (servers, database, object storage) | Alibaba Cloud Computing Co., Ltd. | Runs our servers, database and sign-in service, and stores profile photos | Account information, Sync data, AI point records, feedback, profile photos, server logs | Guangzhou, Guangdong, China |

Alibaba Cloud provides infrastructure on our instructions and does not use your information for its own purposes.

## 4. Third-party libraries (SDKs) in the App

These are open-source libraries that run on your device and **send no data to any third party**.

| Library | Provided by | Purpose | Information |
| --- | --- | --- | --- |
| Logto Swift SDK | Silverhand Inc. (Logto open-source project) | Connects to our own sign-in service and keeps you signed in | Sign-in tokens, sent only to our own sign-in service |
| JOSESwift | airsidemobile (open-source project) | Verifies sign-in tokens | Sign-in tokens, processed on device only |
| KeychainAccess | kishikawakatsumi (open-source project) | Stores sign-in tokens in the iOS Keychain | Sign-in tokens, processed on device only |

The App has **no** analytics, crash reporting, advertising or push notification SDKs.
