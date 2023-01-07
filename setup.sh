#!/bin/bash
# Usage: Setup script for lola-blockly project
#   which generally handles the compiling, symlinking and etc..
# Author: Marius Pozniakovas

symlink_lola_path="Lola"

echo =======================
echo "0. Cleanup"
if [ -L ${symlink_lola_path} ] ; then
   unlink Lola
fi
echo "OK"
echo =======================
echo 

echo =======================
echo "1. Running 'make' in /Lolac submodule"
cd Lolac
make
cd ..
echo "OK"
echo =======================
echo

echo =======================
echo "2. Creating a symlink for compiled Lolac compiler and making it an executable"
ln -s `pwd`/Lolac/Lolac Lola
chmod +x Lola



if [ -L ${symlink_lola_path} ] ; then
   if [ -e ${symlink_lola_path} ] ; then
      echo "OK"
   else
      echo "Broken Lola symlink doesn't link to anything"
      exit 0
   fi
elif [ -e ${symlink_lola_path} ] ; then
   echo "File Lola is not a symlink"
   exit 0
else
   echo "Missing Lola symlink from Lolac/"
   exit 0
fi

echo =======================
echo

echo =======================
echo "3. Running compilation test with Lola"
echo -----------------------
cd tests
../Lola Multiplier.Lola Multiplier.v

compiled_file="Multiplier_test.v"
correct_file="Multiplier.v"

echo -----------------------
echo "Comparing compiled file with correctly compiled one"

if cmp -s "$compiled_file" "$correct_file"; then
    echo "OK"
else
    echo "Test compiling file is different from correctly compiled file"
    echo "Probably means a bad setup or something changed / updated"
    exit 0
fi
echo =======================
echo
