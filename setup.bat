rem Usage: Setup script for lola-blockly project
rem   which generally handles the compiling, symlinking and etc..
rem Author: Marius Pozniakovas

@echo off

SET symlink_lola_path=Lola

:CLEANUP
echo =======================
echo 0. Cleanup
rmdir Lola.exe
echo OK
echo =======================
echo .

:MAKE
echo =======================
echo 1. Running 'make' in /Lolac submodule
pushd Lolac
make
popd
echo OK
echo =======================
echo .

:SYMLINK
echo =======================
echo 2. Creating a symlink for compiled Lolac compiler and making it an executable
mklink /h "Lola.exe" "Lolac\Lolac.exe"
echo OK
echo =======================
echo .

:COMPILE
echo =======================
echo 3. Running compilation test with Lola
echo -----------------------
Lola.exe tests\Multiplier.Lola tests\Multiplier.v
timeout /t 3

echo -----------------------
echo Comparing compiled file with correctly compiled one
pushd tests
fc Multiplier.v Multiplier_test_win.v > nul
if errorlevel 1 goto file_error
popd
echo OK
echo =======================
echo .

:END
pause
exit \b

:file_error
popd
echo Test compiling file is different from correctly compiled file
pause
exit \b
