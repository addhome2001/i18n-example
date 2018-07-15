ttag init <lang> <lang>.po
ttag update zh ttag/*.js


yarn build-all
msginit to init the .po base on .pot
msgmerge merge the .po with .pot