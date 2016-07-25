# Node Backend, Angular 2 and Nativescript Front-end

###Front-end workflow
   + Web app and Nativescript Angular 2 files are symlinked in order to reduce development time of angular front end.
   + Angular 2 will now work for your web app and native ios and android devices.
   + The symlink is run on postinstall of the package.json file.
   + Can be run manually  by the the `npm run linkfiles` command.
   + Only make edits to your angular code in the assets file, The inital boot.ts files will be different for web-app and nativescript files and should be left out of the linked directories.
   + Shared assests such as images, videos etc, should be placed in the assets folder.
   + Work only in one frontend area at a time (src-nativescript or src-web).
   + Views will be different for nativescript and web-app but will still sync, be sure to properly naming the nativescript views in accordance with their best practices.


### Node setup.
   + Basic express genereated back-end for the time being. working on developing a more robust backend that will have a micro-service architecture and work with Docker.

