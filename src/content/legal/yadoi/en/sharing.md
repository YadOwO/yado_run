---
app: yado Items
title: Third-Party Sharing List
updated: 2026-11-26
effective: 2026-11-26
---

This list is part of our [Privacy Policy](/legal/yadoi/privacy/). It covers every case in which the App provides personal information to third parties or has it processed by service providers, and every third-party library in the App.

When the list changes, we update this page and the date at the top. **If we add a new recipient, we will ask for your permission again before you next use the related feature.**

## 1. Sign-in

| Third party | Operator | When | Information | Notes |
| --- | --- | --- | --- | --- |
| Sign in with Apple | Apple Inc. | When you choose Sign in with Apple | Apple account identifier; the name and email address you agree to share (which may be an Apple relay address) | Apple verifies your identity and provides this information to our sign-in service |

This service is covered by [Apple's Privacy Policy](https://www.apple.com/legal/privacy/).

Photo cutout, framing and recognition in the App use the image recognition built into iOS. **They run entirely on your device and nothing is sent to Apple or any third party.**

## 2. Service providers (cloud)

| Provider | Operator | Purpose | Information | Location |
| --- | --- | --- | --- | --- |
| Alibaba Cloud (servers, database, object storage) | Alibaba Cloud Computing Co., Ltd. | Running our servers, database and sign-in service, and storing profile photos | Account information, synced items and categories, Data Linking authorization records, profile photos, server logs | Guangzhou, Guangdong, China |

Alibaba Cloud provides infrastructure on our instructions only and does not use your information for its own purposes. Item photos are not uploaded, so they are not included (profile photos belong to your shared yado account and are not item photos).

## 3. Third-party libraries (SDKs) in the App

These libraries are all open-source software that runs only on your device and **sends no data to any third party**.

| Library | Provider | Purpose | Information |
| --- | --- | --- | --- |
| Logto Swift SDK | Silverhand Inc. (open-source project Logto) | Connects to our own sign-in service to sign you in and keep you signed in | Sign-in tokens, sent only to our own sign-in service |
| JOSESwift | airsidemobile (open-source project) | Verifies sign-in tokens | Sign-in tokens, processed only on your device |
| KeychainAccess | kishikawakatsumi (open-source project) | Stores sign-in tokens in the iOS Keychain | Sign-in tokens, processed only on your device |
| Lottie | Airbnb (open-source project) | Plays animations in the App | No personal information |

The App has **no** analytics, crash-reporting, advertising or push notification SDKs.

## 4. Between yado apps

yado Items and Yado Asset are developed and operated by the same developer and share one yado account, so data moving between them is **not provided to a third party**. We still list it here so you know what moves between the two apps.

| Read by | Information read | Purpose | How to stop it |
| --- | --- | --- | --- |
| Yado Asset | Total purchase price of in-use items and of retired items, and item counts (with and without a purchase price) | Showing item value on Yado Asset's Accounts screen and, if you choose, counting it in your net worth | Revoke under Profile → Data Linking in Yado Asset |

- Yado Asset reads these totals through the yado shared service only after you **authorize it** under Profile → Data Linking in Yado Asset; without authorization, nothing is read;
- It **does not read** item names, photos, categories, notes or other details;
- You can revoke the authorization at any time in the same place, after which nothing more is read.
