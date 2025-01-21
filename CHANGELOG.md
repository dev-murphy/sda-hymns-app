# Changelog

## [1.8.0](https://github.com/dev-murphy/sda-hymns-app/compare/v1.7.0...v1.8.0) (2025-01-21)


### Features

* create 404 and error page ([f1eb0c6](https://github.com/dev-murphy/sda-hymns-app/commit/f1eb0c60a8f4056891d41bd3dd298fdb7fdd1caa))


### Miscellaneous

* add music notes icon to assets ([f4aeb02](https://github.com/dev-murphy/sda-hymns-app/commit/f4aeb0234eb93f0fcec4eee7900c6b57742287d7))
* add navigation guard for hymns and slide pages ([ad41caa](https://github.com/dev-murphy/sda-hymns-app/commit/ad41caa6a9399057e1e3b9b264ebd0700f408d92))
* create home icon comoonent ([ace3165](https://github.com/dev-murphy/sda-hymns-app/commit/ace3165b4e710859f2af4b508c51705509e08c68))
* handle custom keyboard events for opening and closing search modal ([12fcd3b](https://github.com/dev-murphy/sda-hymns-app/commit/12fcd3bafb4f4c23331368de6ad21c694b76d4d8))
* update auto-imported typedef ([9f4fbb4](https://github.com/dev-murphy/sda-hymns-app/commit/9f4fbb4a62b79d3b0315827797d158d7e82eb8b8))


### Documentation

* update TODO file with upcoming tasks ([b3f8bd5](https://github.com/dev-murphy/sda-hymns-app/commit/b3f8bd5a979b9a8ac8da708fa1c4910abf3b4801))


### Code Refactors

* update svg for search icon ([74bcd61](https://github.com/dev-murphy/sda-hymns-app/commit/74bcd61bfadf1431912198cfb399c96fe56b1a62))


### UI Updates

* add keyboard command UI to search button ([c1c5ef9](https://github.com/dev-murphy/sda-hymns-app/commit/c1c5ef9b1dd37671fd91adeb5ee367d3cbe6a6db))

## [1.7.0](https://github.com/dev-murphy/sda-hymns-app/compare/v1.6.0...v1.7.0) (2025-01-20)


### Features

* create data composable for online and offline mode ([b8c4365](https://github.com/dev-murphy/sda-hymns-app/commit/b8c43653f0601ba41cc009224f23c8abc55fa5c9))
* create service worker file ([b9bb48a](https://github.com/dev-murphy/sda-hymns-app/commit/b9bb48a374614acbfb7edcd80a781c58d2db5f81))
* setup dexie database ([79518c7](https://github.com/dev-murphy/sda-hymns-app/commit/79518c71f7f934d232e6977eb5eaa8e0d89057a6))


### Bug Fixes

* resolve issue to manifest config to make web app installable ([1f38dc5](https://github.com/dev-murphy/sda-hymns-app/commit/1f38dc5feaa45f0d18a4ba1ada42e7e968c1b8cb))


### Miscellaneous

* add all fetch functions to data composable ([0473feb](https://github.com/dev-murphy/sda-hymns-app/commit/0473febe41d6d27813818c8d47a0b6d72ef14d81))
* add basic service worker file ([d566bee](https://github.com/dev-murphy/sda-hymns-app/commit/d566bee7116b5d63a3656eea855f6d874beea85a))
* add fetch function for categories, subcategories, specific hymn, and all hymns ([8bc8f68](https://github.com/dev-murphy/sda-hymns-app/commit/8bc8f68cab9c33342438d0198a1f066f489c2817))
* add hymn json file to load hymn data ([1c38c8f](https://github.com/dev-murphy/sda-hymns-app/commit/1c38c8f99196214e2f37b21b8b43ebeb76857a53))
* add pwa config ([b4738bd](https://github.com/dev-murphy/sda-hymns-app/commit/b4738bdac02b439f2430dcd0544c6ec2e1d2fcb3))
* add query param type def ([ae2ade3](https://github.com/dev-murphy/sda-hymns-app/commit/ae2ade3eb5c0d6b5e9aa8eb62a2ef729482615b7))
* add workbox config to vite pwa config ([ddec8e1](https://github.com/dev-murphy/sda-hymns-app/commit/ddec8e1715463d292830817d2a1bec5142f3c1b2))
* complete eleventh task ([ac77509](https://github.com/dev-murphy/sda-hymns-app/commit/ac775091d7761730949c0139a2fd0cb5f7e964f0))
* complete twelfth task ([bb73b9b](https://github.com/dev-murphy/sda-hymns-app/commit/bb73b9b5b344eacb25c9bf6ec29829cda9586f8a))
* create utils file ([a82a142](https://github.com/dev-murphy/sda-hymns-app/commit/a82a1427689bcb4edc5a8b4f9ea21de752c41b8c))
* include image asset files ([d26a685](https://github.com/dev-murphy/sda-hymns-app/commit/d26a6855ea8cf94e2a8ca40c944156ccd04063bd))
* install dexie deps ([e6c97a5](https://github.com/dev-murphy/sda-hymns-app/commit/e6c97a5b748e3fea7da89ea6ab1aef29cdaca535))
* install vite-plugin-pwa deps ([f5b9ace](https://github.com/dev-murphy/sda-hymns-app/commit/f5b9ace12b0563dcb69cd699a222337e3c3a0ce8))
* move logo to public folder ([c6527ea](https://github.com/dev-murphy/sda-hymns-app/commit/c6527ea831f5391f9cde97250776fc99227a6da7))
* register service worker and preload dexie database with hymn data ([988f555](https://github.com/dev-murphy/sda-hymns-app/commit/988f5552bc7b8711ecd988d0ff020007f11fdf5e))
* rename pwa images in public folder ([ae72045](https://github.com/dev-murphy/sda-hymns-app/commit/ae7204510257f9ad8eae6245a2c95209eaca154d))
* update auto-imported typedef ([01eccac](https://github.com/dev-murphy/sda-hymns-app/commit/01eccac87965751910d9d3129c195985c7b03ead))
* update auto-imported typedef ([0536b3b](https://github.com/dev-murphy/sda-hymns-app/commit/0536b3bbafa5a58015144fff73ce0ddaa9eac42c))
* update PWA config ([3d0e5d8](https://github.com/dev-murphy/sda-hymns-app/commit/3d0e5d8c7e6d94fcf4651899e71305ad78c9c1d8))


### Documentation

* add more to dos to .todo file ([201b41f](https://github.com/dev-murphy/sda-hymns-app/commit/201b41fd720310c98cde3a8058ed3ec71bf7fee6))


### Code Refactors

* cache assets folder ([0c23324](https://github.com/dev-murphy/sda-hymns-app/commit/0c23324a4ec076c258ea5dd874c230cc866610a3))
* made parseQueryParams function with generic type ([33c86fd](https://github.com/dev-murphy/sda-hymns-app/commit/33c86fda74bfac8fa68caecbac45c954fae4e2cd))
* remove manifest file ([87e1454](https://github.com/dev-murphy/sda-hymns-app/commit/87e14540aac74e8b113cca27ddad30e607fefedf))
* remove non-existent assets, update start_url ([426fe39](https://github.com/dev-murphy/sda-hymns-app/commit/426fe39d46a6089bbfec7cca9dadc1f5185242ed))
* replace useFetch with useData composable ([1160e2f](https://github.com/dev-murphy/sda-hymns-app/commit/1160e2f74373a21afe0cbfeda814051ac57d3f6a))
* replace useFetch with useData composable ([5beaf93](https://github.com/dev-murphy/sda-hymns-app/commit/5beaf939185b0d002703a0646c90c68a91eb088d))
* update logo url to public folder ([a2bed5e](https://github.com/dev-murphy/sda-hymns-app/commit/a2bed5e2fcc25de8e7bbe4c48d6ff246a0f311ec))


### UI Updates

* resolve weird overflow problem ([1bd0847](https://github.com/dev-murphy/sda-hymns-app/commit/1bd084791c3f494c34eda28d8c933de1b22fc21d))

## [1.6.0](https://github.com/dev-murphy/sda-hymns-app/compare/v1.5.0...v1.6.0) (2025-01-17)


### Features

* add landscape modal to root of app ([770cb9c](https://github.com/dev-murphy/sda-hymns-app/commit/770cb9c046d40ebfce62db90efe3cfeba7ebe9a3))
* create landscape modal component ([0e47eb6](https://github.com/dev-murphy/sda-hymns-app/commit/0e47eb670812d0c8ada4d16edb54b31c65c9d416))


### Bug Fixes

* only show landscape modal on slides page ([5a3220b](https://github.com/dev-murphy/sda-hymns-app/commit/5a3220b9f4e3d217548d13af0eb953fc5ad7f2c0))


### Miscellaneous

* add composable dir to auto import config ([2fdc446](https://github.com/dev-murphy/sda-hymns-app/commit/2fdc4461600f994ce10f9ede6b7ec0e6b662b38f))
* add tap on side to navigate through the verse ([2a198fe](https://github.com/dev-murphy/sda-hymns-app/commit/2a198fe6e804d1af4b9b4a3532a2b4beb965428d))
* create composable for checking device orientation ([be43866](https://github.com/dev-murphy/sda-hymns-app/commit/be4386630fb93e401cb50f5c781019f559e7befb))
* create composable that checks if user device is mobile ([9d90282](https://github.com/dev-murphy/sda-hymns-app/commit/9d902826511a14189cf371df75da1f397118c234))
* prevent scroll on landscape model component ([36e72d6](https://github.com/dev-murphy/sda-hymns-app/commit/36e72d6fd9384a0d15f55691009f69309f3d84c5))
* update auto-imported typedef ([aa42021](https://github.com/dev-murphy/sda-hymns-app/commit/aa42021ae6b586f1efb31f95f366a1c339dd7003))


### UI Updates

* resolve placement and overflow issue on background component ([26a6199](https://github.com/dev-murphy/sda-hymns-app/commit/26a61997f48f0269fb50689184721c0f7a829824))

## [1.5.0](https://github.com/dev-murphy/sda-hymns-app/compare/v1.4.0...v1.5.0) (2025-01-17)


### Features

* create presentation page ([f54784b](https://github.com/dev-murphy/sda-hymns-app/commit/f54784bcd1c1aaa8dcb9002b3d15bcb0bfa2637d))


### Miscellaneous

* add swipe to next hymn, center align hymn title ([cbb51a0](https://github.com/dev-murphy/sda-hymns-app/commit/cbb51a0f9545e9e8846c1c3ca8b875ea62eeafde))
* complete tenth task ([f68d514](https://github.com/dev-murphy/sda-hymns-app/commit/f68d51463c4a263287314b627c1e529a45906bd8))
* create background component ([7951ac4](https://github.com/dev-murphy/sda-hymns-app/commit/7951ac4d4b5100aa7d2f677504f0d939f1d73d42))
* create present icon component ([8259734](https://github.com/dev-murphy/sda-hymns-app/commit/82597343ad68db8fc3267293d5f64fef0e6c0660))
* update auto-imported typedef ([056d8e1](https://github.com/dev-murphy/sda-hymns-app/commit/056d8e1a599b57db3e0db7afedc617267a70da94))
* update auto-imported typedef ([bc426b4](https://github.com/dev-murphy/sda-hymns-app/commit/bc426b48d6528c5b594c0e6dda4b3055213bf96a))
* update route type, hide present text ([ff8e89e](https://github.com/dev-murphy/sda-hymns-app/commit/ff8e89ed07fc64dc838e814c00d1fa8fb135dec3))
* update the swipe event ([2002eff](https://github.com/dev-murphy/sda-hymns-app/commit/2002eff03cf0cccdb7a9a5d0eeadbbbe4e822dce))


### UI Updates

* center align hymn number ([d6dde63](https://github.com/dev-murphy/sda-hymns-app/commit/d6dde6340e5c71b95d52d6ffae292b932d531fb0))
* update font size and correct center align hymn title ([4b0ea6f](https://github.com/dev-murphy/sda-hymns-app/commit/4b0ea6fab54b827610ecab8f9bcd361a5a978c82))
* update icon size, hide search text on small screens ([1481007](https://github.com/dev-murphy/sda-hymns-app/commit/148100770e980c343c163c2863676791c3c5da8b))
* update overflow style to hidden on x axis ([a8d1ddf](https://github.com/dev-murphy/sda-hymns-app/commit/a8d1ddfd2430dc6579cd7a48262e139c4fe7daf4))

## [1.4.0](https://github.com/dev-murphy/sda-hymns-app/compare/v1.3.0...v1.4.0) (2025-01-17)


### Features

* create audio player component ([c46aca4](https://github.com/dev-murphy/sda-hymns-app/commit/c46aca45d7a2bdc770ab11f3cdd683dfb4762dee))
* create play, pause and stop icon component ([924e757](https://github.com/dev-murphy/sda-hymns-app/commit/924e757244a69e9715b2d2eb64ca68b5bb502781))


### Miscellaneous

* add audio player to hymn number page ([78d5685](https://github.com/dev-murphy/sda-hymns-app/commit/78d56856ff60e476dc74127b0d1c6036ad6e7081))
* complete ninth task ([8c23867](https://github.com/dev-murphy/sda-hymns-app/commit/8c23867378e3585e2dda5e36a5d1d567cfffd617))
* update auto-imported typedef ([18cc622](https://github.com/dev-murphy/sda-hymns-app/commit/18cc6222ee55c824c98b02570204a04d4716bbd3))

## [1.3.0](https://github.com/dev-murphy/sda-hymns-app/compare/v1.2.0...v1.3.0) (2025-01-12)


### Features

* create hymn page ([2fda354](https://github.com/dev-murphy/sda-hymns-app/commit/2fda35420acf10bc2c9778a2845c83579d1cde07))
* create navbar component for hymn page ([9da47ab](https://github.com/dev-murphy/sda-hymns-app/commit/9da47ab0a9fb168315cc1a396a13896be83d37a3))


### Miscellaneous

* add hymn route to hymn item component ([77bd3f6](https://github.com/dev-murphy/sda-hymns-app/commit/77bd3f61e3483ac9f155e79eb24ef38261106c25))
* add hymn route to search result in the search command component ([677528e](https://github.com/dev-murphy/sda-hymns-app/commit/677528e7d0b089580fddf8a20d7a05b14a161e4a))
* set input to auto-focus when mounted ([b20e3b7](https://github.com/dev-murphy/sda-hymns-app/commit/b20e3b79045947d82b0499a27abf51541feb6412))
* update auto-imported typedefs ([2ed571b](https://github.com/dev-murphy/sda-hymns-app/commit/2ed571bf9c2bbec362847aa4f668dec034426fb0))


### Documentation

* complete eight task ([798889d](https://github.com/dev-murphy/sda-hymns-app/commit/798889d20f2601ca5c81265619f7f75e6010ad42))


### Code Refactors

* add home page route to back button ([1a8d008](https://github.com/dev-murphy/sda-hymns-app/commit/1a8d008bcf19970081dc1df7690ffc25d6c8352a))
* move side paddings to app component to individual page ([3407c17](https://github.com/dev-murphy/sda-hymns-app/commit/3407c1717f775504ee582b4a7f3103101b3726f4))
* remove unused label props ([dbad4c3](https://github.com/dev-murphy/sda-hymns-app/commit/dbad4c3615741858590008f30082939763e90deb))

## [1.2.0](https://github.com/dev-murphy/sda-hymns-app/compare/v1.1.2...v1.2.0) (2025-01-12)


### Features

* add search command component ([83591b3](https://github.com/dev-murphy/sda-hymns-app/commit/83591b35c46895c0bb1fa3472a717b6a454fb395))
* add search input component ([51ee10a](https://github.com/dev-murphy/sda-hymns-app/commit/51ee10a03ed501bf8f7046e3a83efaf5d07eddf5))
* add search, close, enter key and narrow arrow icon component ([0e2179d](https://github.com/dev-murphy/sda-hymns-app/commit/0e2179d75302cad7a278db577cdd7698affcfde0))
* create search button component ([3dc35a4](https://github.com/dev-murphy/sda-hymns-app/commit/3dc35a40fdfb8ec4f05193da70d239bd1320114e))


### Miscellaneous

* add fuse.js deps ([24d5ed6](https://github.com/dev-murphy/sda-hymns-app/commit/24d5ed61d9d4025bcf3f449b89633aac44f97fb9))
* add robots.txt file ([3b383d3](https://github.com/dev-murphy/sda-hymns-app/commit/3b383d33ff7978c27f30aca16a99185e16b63f0f))
* add search button component to home page ([6b2fa15](https://github.com/dev-murphy/sda-hymns-app/commit/6b2fa154c54ffc6aab326c6027f3df40da266670))
* complete seventh task ([a879723](https://github.com/dev-murphy/sda-hymns-app/commit/a87972333f7cf83c049b3ee99c2336b62830129b))
* correct asset url, update layout to content is at the top ([c1e486b](https://github.com/dev-murphy/sda-hymns-app/commit/c1e486b66776c998abba458f3a03763a2805cd94))
* max out lighthouse score ([7683821](https://github.com/dev-murphy/sda-hymns-app/commit/7683821feaf6cdee14823275950439c5e9268f75))
* move assets folder to src directory ([6c44e3d](https://github.com/dev-murphy/sda-hymns-app/commit/6c44e3dd5d19ce547924068163fbf548436ad4c4))
* update auto-imported typedefs ([f2463cf](https://github.com/dev-murphy/sda-hymns-app/commit/f2463cfe99f72ce3bd50d4e62e5c7375f76d15e6))

## [1.1.2](https://github.com/dev-murphy/sda-hymns-app/compare/v1.1.1...v1.1.2) (2025-01-10)


### UI Updates

* add spacing between title and author ([5b49990](https://github.com/dev-murphy/sda-hymns-app/commit/5b49990b352d61dae5c59000f3a059b57651fc5f))

## [1.1.1](https://github.com/dev-murphy/sda-hymns-app/compare/v1.1.0...v1.1.1) (2025-01-10)


### UI Updates

* resolve hymn item layout ([01cd5aa](https://github.com/dev-murphy/sda-hymns-app/commit/01cd5aa51b94a1af8f0ffcf28d4cef0199b41c3d))

## [1.1.0](https://github.com/dev-murphy/sda-hymns-app/compare/v1.0.0...v1.1.0) (2025-01-10)


### Features

* add basic route-based pagination ([26cfae9](https://github.com/dev-murphy/sda-hymns-app/commit/26cfae912ab3bc9f2307b4f4ae6ee1cb1ff65abf))
* add breadcrumbs component ([45dcba2](https://github.com/dev-murphy/sda-hymns-app/commit/45dcba2fcf8092d87c46b3d4d408f7031e5f7cdc))
* add custom dropdown component ([d62529f](https://github.com/dev-murphy/sda-hymns-app/commit/d62529f4ed7df2ca491c2357155938024a92dbd8))
* add pagination component ([81a9eb0](https://github.com/dev-murphy/sda-hymns-app/commit/81a9eb0184e1d32e97cef66d5e9d5c3f47073ff5))


### Miscellaneous

* add breadcrumbs to home page ([f25b639](https://github.com/dev-murphy/sda-hymns-app/commit/f25b6398ff10d53e801347028cc6a7a718eeaa5e))
* add chevron icon component ([c6fcb48](https://github.com/dev-murphy/sda-hymns-app/commit/c6fcb489c40ae2528aee5d3ba1d2832a3d84ad0a))
* add example env ([85306ad](https://github.com/dev-murphy/sda-hymns-app/commit/85306ad33b358c2d540dbed6c3eca309055e044b))
* add grid and list icon ([1ca9151](https://github.com/dev-murphy/sda-hymns-app/commit/1ca915140950d8b5b234804812cf107ee4fdb0d8))
* add home page header ([8353205](https://github.com/dev-murphy/sda-hymns-app/commit/83532059b9e6332b5cd294b3d4c6955c00f8023a))
* add hymn data type def ([c830420](https://github.com/dev-murphy/sda-hymns-app/commit/c83042057714b5144ac6659e820beb3f908bf658))
* add hymn item component ([e77bdd1](https://github.com/dev-murphy/sda-hymns-app/commit/e77bdd122800654e840cc0c5dacad702332e04f4))
* add hymn list component ([5b5660c](https://github.com/dev-murphy/sda-hymns-app/commit/5b5660ce571d83d2881ef9960cc491d9744dfb7c))
* add hymn list component to home page ([2bd38a9](https://github.com/dev-murphy/sda-hymns-app/commit/2bd38a9f11b9522a56f4b13d7278c578b1c917b7))
* add logo to assets folder ([2bb881c](https://github.com/dev-murphy/sda-hymns-app/commit/2bb881cf4d345f827f4c9fc2723216d5c6082806))
* add sort, filter, sun and moon icons ([73238b4](https://github.com/dev-murphy/sda-hymns-app/commit/73238b493c17021f2a9515e82494f441945e70d5))
* add vueuse/core ([5e131e2](https://github.com/dev-murphy/sda-hymns-app/commit/5e131e207c893822e7f6408fa887c688dc6e67a9))
* add vueuse/core to auto import ([a3b8700](https://github.com/dev-murphy/sda-hymns-app/commit/a3b8700fdfed72fc8c22578a6395a177117e958d))
* finalize basic UI for home page ([c7dcc76](https://github.com/dev-murphy/sda-hymns-app/commit/c7dcc769f9c3f82513947cd0058a654e95d07b4b))
* ignore .env file ([91b6f8c](https://github.com/dev-murphy/sda-hymns-app/commit/91b6f8c1bd0c9d2c54a7a0cfb7a9712997056cdf))
* update auto-imported typedef ([523d140](https://github.com/dev-murphy/sda-hymns-app/commit/523d140534174de37ea13c2fb86789e35abbc114))


### Documentation

* complete sixth task and refactor to dos ([3c0623a](https://github.com/dev-murphy/sda-hymns-app/commit/3c0623a096bdcd077cfcb225e649cac9f87f1ec6))


### Code Refactors

* add default option to dropdown component ([e68b909](https://github.com/dev-murphy/sda-hymns-app/commit/e68b909ba076eb84a4bb38969e19a1cddcc56d1b))
* move data fetching to parent component ([9ad9245](https://github.com/dev-murphy/sda-hymns-app/commit/9ad92451729919be187fc9dfb7ad3386c3157eab))


### UI Updates

* made hymn item component mobile responsive ([3e41e78](https://github.com/dev-murphy/sda-hymns-app/commit/3e41e78707728a499fe1f0fb5cd448dd6044e3b1))
* resolve text wrapping issue on smaller screens ([8bf6858](https://github.com/dev-murphy/sda-hymns-app/commit/8bf68582bcfd389a3cc78c579eebc8780a6eb61f))
* update UI for pagination component ([bb752b1](https://github.com/dev-murphy/sda-hymns-app/commit/bb752b1704b3c912ea06c2fc80f422b8b36756a8))

## 1.0.0 (2025-01-08)


### Features

* initial commit ([72aa7d0](https://github.com/dev-murphy/sda-hymns-app/commit/72aa7d0e1562e619d39e9b9bcf88c7d6c037fb0e))


### Miscellaneous

* add basic vercel config ([19ac4ca](https://github.com/dev-murphy/sda-hymns-app/commit/19ac4cacf780c42f59334faccaedc533a178b916))
* add favicons and other public assets ([0b40835](https://github.com/dev-murphy/sda-hymns-app/commit/0b40835f981f004a7f19e51221615d1298c51d64))
* add meta description ([89ec2a8](https://github.com/dev-murphy/sda-hymns-app/commit/89ec2a8796deaf62c3272f136b8984b9f70e755b))
* add pinia ([6b5c863](https://github.com/dev-murphy/sda-hymns-app/commit/6b5c863e776a56c526e1f7cd6994d4556c7e5182))
* add tailwindcss ([373d124](https://github.com/dev-murphy/sda-hymns-app/commit/373d124a77d91c7374456ad85db31c1b47c1217f))
* add unplugin-auto-import ([61c4ec7](https://github.com/dev-murphy/sda-hymns-app/commit/61c4ec7238100f6a38eacd256377515ee03814a6))
* add uplugin-vue-components ([a199573](https://github.com/dev-murphy/sda-hymns-app/commit/a199573ea372cd1d272652c7dd653186552a2ae2))
* add vue-router and unplugin-vue-router ([7a081c3](https://github.com/dev-murphy/sda-hymns-app/commit/7a081c3e485b0b90511413a7a6cdb64498c2bf10))
* add vue-router-auto-imports to auto import config ([b4cce52](https://github.com/dev-murphy/sda-hymns-app/commit/b4cce52c046d452b6012d5bea85590e8cfda0b21))
* add webfont-dl and google fonts ([250d1af](https://github.com/dev-murphy/sda-hymns-app/commit/250d1af4c93e94a8d28f828a12c34e82a8223470))
* complete fifth task ([30e5f6f](https://github.com/dev-murphy/sda-hymns-app/commit/30e5f6f7c83bb6958df26d04afb7767e8334fccc))
* complete fourth task ([744ebdc](https://github.com/dev-murphy/sda-hymns-app/commit/744ebdc4590dc7a5dbe41774330278e763fbd94b))
* remove boilerplate code ([f4b98ad](https://github.com/dev-murphy/sda-hymns-app/commit/f4b98ad30e3f62afacf866281dc925fb9cfa60ba))
* **todo:** complete first task ([0f45a62](https://github.com/dev-murphy/sda-hymns-app/commit/0f45a629e0efee58887d5e2c38c68bf428e158d4))
* **todo:** complete second task ([299280a](https://github.com/dev-murphy/sda-hymns-app/commit/299280a778abde6dd5e7f8d89df9abb2a44585b2))
* **todo:** complete third task ([fd12386](https://github.com/dev-murphy/sda-hymns-app/commit/fd12386297607254ca9806f3ab9b96cc4a8659ab))


### Documentation

* add project info to README ([7c7c502](https://github.com/dev-murphy/sda-hymns-app/commit/7c7c5022cd3f74fe5bdde338af903c40433bf699))
* add todo list for tracking purposes ([9863773](https://github.com/dev-murphy/sda-hymns-app/commit/9863773935c19ffdba863a6556d116f9b8ba83da))


### CI/CD

* add release action ([2c305d9](https://github.com/dev-murphy/sda-hymns-app/commit/2c305d999712f186c3f3b6da116a8990afd965c2))
