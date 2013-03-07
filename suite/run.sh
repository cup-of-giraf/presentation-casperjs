#!/usr/bin/env bash
SCRIPTPATH=`readlink -f $0`;
SCRIPTNAME=$(basename $SCRIPTPATH)
ROOT_DIR="$(dirname $SCRIPTPATH)"

CASPER_COMMAND="casperjs test $ROOT_DIR --include=$ROOT_DIR/pre.js"
XUNIT="build/junit-casper.xml"
SHORT_OPT="t:s:xh"
LONG_OPT="host:,screenshot:caper-xunit,help"

# write usage
function usage {
    printf "Launch tests\n"
    printf "\n"
    printf "  $SCRIPTNAME --host http://localhost/\n"
    printf "Options\n"
    printf "\t-t --host         : changes host\n"
    printf "\t-s --screenshot   : changes screenshot destination\n"
    printf "\t-x --casper-xunit : output casper tests in xunit format\n"
    printf "\t-h --help         : this help\n"
}

# parse arguments
OPTS=$( getopt -o "$SHORT_OPT" -l "$LONG_OPT" -- "$@" )
if  [ $? != 0 ]; then
    usage;
    exit 1;
fi
eval set -- "$OPTS"

# read options
while true ; do
    case "$1" in
        -t|--host) HOST="$2"
            shift2;;
        -s|--screenshot) SCREENSHOT="$2"
            shift2;;
        -h|--help) usage
            exit 0;;
        -x|--casper-xunit)
            CASPER_COMMAND="$CASPER_COMMAND --xunit=$XUNIT"
            shift2;;
        --) shift
            break;;
    esac
done

# extend comand with options
CASPER_COMMAND="$CASPER_COMMAND --host=$HOST"
CASPER_COMMAND="$CASPER_COMMAND --screenshot=$ERROR"
$CASPER_COMMAND
