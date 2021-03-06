SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;


DROP TABLE IF EXISTS `chatusers`;
CREATE TABLE IF NOT EXISTS `chatusers` (
  `steamID` varchar(50) NOT NULL,
  `whatever` int(11) NOT NULL,
  UNIQUE KEY `steamID` (`steamID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `gamesplayed`;
CREATE TABLE IF NOT EXISTS `gamesplayed` (
  `gamesPlayedID` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `gameID` varchar(50) NOT NULL,
  `gameName` text NOT NULL,
  `playerSteamID` varchar(50) NOT NULL,
  PRIMARY KEY (`gamesPlayedID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `kickbans`;
CREATE TABLE IF NOT EXISTS `kickbans` (
  `kickbanID` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `victimID` varchar(50) NOT NULL,
  `executorID` varchar(50) NOT NULL,
  `kickbanType` int(2) NOT NULL,
  PRIMARY KEY (`kickbanID`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 ;

DROP TABLE IF EXISTS `links`;
CREATE TABLE IF NOT EXISTS `links` (
  `linkID` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `steamID` varchar(50) NOT NULL,
  `linkURL` text NOT NULL,
  PRIMARY KEY (`linkID`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 ;

DROP TABLE IF EXISTS `logs`;
CREATE TABLE IF NOT EXISTS `logs` (
  `logID` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `steamID` varchar(50) CHARACTER SET latin1 NOT NULL,
  `chatMessage` text NOT NULL,
  `wordCount` varchar(4) CHARACTER SET latin1 NOT NULL,
  `linkCount` varchar(4) CHARACTER SET latin1 NOT NULL,
  `emptyQuoteCount` int(4) NOT NULL,
  `type` varchar(10) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`logID`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
