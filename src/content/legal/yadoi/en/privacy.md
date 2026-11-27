---
app: yado Items
title: Privacy Policy
updated: 2026-11-26
effective: 2026-11-26
---

yado Items ("the App") is an app for keeping a record of the things you own, developed and operated by the independent developer **YU JUNJIE** ("we", "us"). This policy explains in plain language what we collect, why, where it is stored, how long we keep it, who we share it with, and how you can control it.

**Please pay particular attention to the parts in bold.** If you have any questions, contact us using the details at the end.

## The short version

- **You can use every feature without signing in, and your items stay on your phone by default.**
- Your items and categories are synced to our servers only if you sign in with a yado account.
- **Item photos stay on your device and are never uploaded to our servers.** Photo cutout and recognition happen on your device.
- The App has no third-party analytics, crash-reporting or advertising SDKs. We don't track you. **We do not sell or share your personal information.**
- You can export a backup or delete items at any time, and contact us to delete your account.

## 1. What we collect and why

Every feature of the App (items, categories, statistics, timeline, achievements, themes, warranty reminders and backup export) works without signing in. Your data then stays on your device and **we receive nothing**. Below is what is processed when you sign in or use specific features.

### Account (optional)

Signing in lets you sync your items across devices and restore them on a new one. yado Items shares one **yado account** with the other apps in the yado series, such as Yado Asset. You can choose:

- **Sign in with Apple**: our sign-in service receives an account identifier from Apple and, if you agree on Apple's screen, your name and email address (if you choose "Hide My Email", we receive an Apple relay address instead).
- **Username and password**: you set them on our sign-in page. The password is stored only as a one-way hash in the sign-in service; the App itself never sees it.

When you sign in, a random account ID is created, which our services use to tell users apart. You can also set a **nickname**. We run our own sign-in service and don't use another company's account system (when you use Sign in with Apple, Apple verifies your identity).

**The App's server stores only your account ID.** Your nickname and email address are kept only in the yado account sign-in service.

### Sync (on automatically when signed in)

When you are signed in, the App syncs your items and categories to our servers. The first time you sign in, the items and categories already on your device are uploaded to your account. We upload:

- **Items**: name, category, icon type (emoji, built-in icon, photo or cutout), icon value, status (in use, retired, sold), favorite flag, note, purchase price, sale price, purchase date, sale date, warranty end date, and when the item was created, changed or deleted;
- **Categories**: name, sort order, and when the category was created, changed or deleted.

**Item photos are not uploaded.** When an item's icon is a photo or cutout, we upload only the photo's file name (a random string) and its framing point. The photo itself stays on your device, so it won't appear if you sign in on another device. Achievements, themes and showcase settings are not uploaded either.

**This data is encrypted in transit but not end-to-end encrypted on our servers, which means we are technically able to access it.** We use it only to provide sync and will not view, analyze or use it for anything else, except to investigate a problem you report or as required by law.

When you delete an item or category in the App, it disappears from all your devices and the server record is marked as deleted; **it is erased completely when you delete your account**. When you sign out, the items on your device are cleared, but your cloud data stays in your account and comes back when you sign in again.

### Photos and on-device recognition

You can take a photo or pick one from your library as an item icon. Photos are stored in the App's storage on your device. The App uses the image recognition built into iOS to **cut out the item, choose the framing**, and detect whether a photo shows a car (to unlock an achievement). **All of this runs on your device without going online. Photos are never sent to us or to any third party.**

### Warranty reminders

If you enter a warranty end date, the App schedules a local notification on your device to remind you before it ends. The notification includes the item name and is shown by iOS on your device **without going through our servers**. You can turn reminders off in the App's reminder settings or in iOS Settings.

### Backup export

You can export a backup file from the Me tab. It contains your items, categories, photos, achievements and theme settings. You save or send it yourself through the iOS share sheet, and **we never receive it**. The backup file is not encrypted, so keep it safe.

### Data Linking with Yado Asset (off by default)

If you also use our app Yado Asset, you can authorize it under Me → Data Linking in Yado Asset to show the value of your items on its Accounts screen. **Nothing is read unless you authorize it in Yado Asset.** Once you do:

- Yado Asset reads, through your yado account, your **total purchase price of items** (in-use and retired separately) and your **item counts** (with and without a purchase price);
- **It does not read item names, photos, categories, notes or other details**;
- Our servers don't store these totals. They keep only the authorization record (when you authorized and revoked) until you delete your account;
- You can revoke the authorization at any time under Me → Data Linking in Yado Asset, after which nothing more is read.

### Server logs

To keep our services secure and stable, troubleshoot problems and meet legal log-retention requirements, our servers keep access logs including **IP address, time, the endpoint requested, the result and how long it took**; some logs also include your account ID. **Logs don't contain item names, notes, prices or other item content.**

### Device permissions

The App asks for a permission only when you use the related feature, and you can turn it off at any time in iOS Settings.

| Permission | Used for | If you don't allow it |
| --- | --- | --- |
| Camera | Taking a photo of an item to use as its icon | You can still pick a photo from your library or use an emoji or built-in icon |
| Notifications | Reminding you before a warranty ends | You won't get warranty reminders |

**About your photo library**: the App uses the iOS photo picker, which only gives the App the photos you choose. It can't see the rest of your library, so it doesn't need photo library permission.

### What we don't do

- We don't collect your contacts, location, health data, clipboard or advertising identifier (IDFA);
- We don't upload your item photos;
- We don't track you across apps or websites, build profiles or show personalized ads;
- The App has no third-party analytics, crash-reporting or advertising SDKs, and no in-app purchases;
- **We do not sell your personal information.**

## 2. Sensitive information

The App doesn't ask you for sensitive personal information. Note that notes you write and photos you take may contain sensitive content (for example, IDs or receipts). **Photos stay on your device, but notes are uploaded with sync**, so write only what you're comfortable with.

**Personal information of children under 14 is sensitive personal information under Chinese law. The App is not intended for children under 14.**

## 3. Sharing

### Third parties we provide data to

We provide your information to third parties only in the cases below. See the [Third-Party Sharing List](/legal/yadoi/sharing/) for each recipient, what it receives and why.

- **Apple**: when you use Sign in with Apple, Apple verifies your identity and provides the information you agree to share to our sign-in service.
- Other than this, the App does not provide your personal information to any third party.

**If we add a new recipient, we will update the list and ask for your permission again before you next use the related feature.**

### Service providers

Our servers, database and sign-in service run on **Alibaba Cloud** (servers in Guangzhou, Guangdong, China). Alibaba Cloud provides infrastructure on our instructions only and does not use your information for its own purposes.

### Third-party SDKs

The App uses only four open-source libraries: Logto Swift SDK, JOSESwift and KeychainAccess (for signing in and storing sign-in tokens securely) and Lottie (for playing animations). They run only on your device and **send no data to any third party**. See the list for details.

The sign-in page opens in an in-app browser and uses cookies to keep your sign-in session. These cookies are used only for signing in.

### Disclosure and transfer

We will not disclose your personal information publicly unless you give separate consent or the law, a court or a government authority requires it. If the App is taken over by another operator through a merger, transfer or similar event, we will tell you the recipient's name and contact details and require it to keep following this policy; if it changes the purpose or method of processing, it will ask for your consent again.

## 4. Where and how long we store data

**Location**: the personal information we collect is stored in **mainland China** (Alibaba Cloud, Guangzhou). If you use the App outside China, your information is transferred to China for storage and processing.

**Retention**: we keep your information only as long as needed:

| Information | How long |
| --- | --- |
| Items, categories, photos, achievements and settings on your device | On your device, under your control; items and categories on the device are cleared when you sign out |
| Items and categories synced to our servers (including deleted records) | Until you delete your account |
| Account information and nickname | Until you delete your account |
| Data Linking authorization record | Until you delete your account |
| Server logs | 6 months |

After that, we delete or anonymize your information. Database backups are overwritten by newer backups at the end of each backup cycle. After you delete your account, we keep your account ID and the deletion time only to stop a deleted account from writing data again.

## 5. Security

- All network traffic uses HTTPS (TLS);
- Sign-in tokens are kept in the iOS Keychain, and passwords are stored only as one-way hashes;
- Servers expose only the ports they need, the database is not reachable from the internet, and only the developer has administrative access;
- Each service can access only its own data; the data link between yado Items and Yado Asset only transfers totals, never item details;
- We minimize data: for example, photos are never uploaded, and the App's server doesn't store your nickname or email address.

No system is perfectly secure, and **sync data is not currently end-to-end encrypted**. If a security incident affects your personal information, we will tell you promptly, as required by law, through the App or by email, including what happened, its possible impact, what we have done and what you can do.

## 6. Your choices and rights

- **Access and copy**: your items are always visible in the App, and you can **export a backup file** from the Me tab for a complete copy.
- **Correct**: edit items, categories and your nickname directly in the App.
- **Delete**: delete any item or category in the App.
- **Withdraw consent**: sign out, revoke Data Linking in Yado Asset, or revoke permissions in iOS Settings, at any time. This doesn't affect processing done before.
- **Delete your account**: email us at the address below. We then delete, or anonymize, your account information, all items and categories synced to our servers (including deleted records) and your Data Linking authorization record. **Your yado account is shared across the yado series, so deleting it also deletes your account data in Yado Asset and other yado apps. This cannot be undone, so export anything you want to keep first.** The data on your device is not affected; you can delete it yourself.
- **Ask and complain**: contact us for an explanation of this policy or how we handle your data.

For anything you can't do in the App, contact us using the details below. We will respond within **15 business days** after verifying your identity.

## 7. Children

**The App is not intended for children under 14.** If you are under 14, please don't sign in or use features that require personal information. If you are between 14 and 18, please use the App with your parent's or guardian's consent and guidance.

If we learn that we have collected personal information from a child under 14 without a guardian's consent, we will delete it as soon as possible. Parents and guardians with questions can contact us.

## 8. Additional information for users in the United States

- **Categories of personal information** we collect are described in section 1: identifiers (account ID, IP address), personal information you provide (name, email, username, nickname), the item records you sync (including purchase and sale prices and notes) and, if you turn on Data Linking in Yado Asset, item purchase-price totals and item counts.
- **We do not sell or "share" personal information** for cross-context behavioral advertising, and we have not done so in the past 12 months. We do not use sensitive personal information to infer characteristics about you.
- **Your rights**: depending on your state, you may have the right to know, access, correct and delete your personal information, and to obtain a portable copy. You can exercise most of these in the App, or by emailing us. You may use an authorized agent; we may ask you to verify your identity. **We will not discriminate against you for exercising your rights.**
- **Do Not Track**: the App does not track you across third-party websites or apps, so Do Not Track signals don't change how it works.
- **Data location**: your information is stored and processed in China, as described in section 4.

## 9. Changes to this policy

We may update this policy when features or laws change. We will post the new version on this page and update the date at the top. **If a change significantly affects the purpose, method or scope of processing, we will notify you prominently in the App, for example with a pop-up, and ask for your consent again where required.**

## 10. Contact us

- Data controller: YU JUNJIE (independent developer)
- Email: yado.dev@proton.me

We will reply within 15 business days after receiving your email and verifying your identity. If you are not satisfied with our reply, you may contact your local data protection or consumer protection authority.
