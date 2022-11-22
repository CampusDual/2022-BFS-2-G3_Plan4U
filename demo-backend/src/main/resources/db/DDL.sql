CREATE TABLE IF NOT EXISTS USERS (ID SERIAL NOT NULL, NIF VARCHAR(10), NAME VARCHAR(255) NOT NULL, SURNAME1 VARCHAR(255) NOT NULL, SURNAME2 VARCHAR(255), LOGIN VARCHAR(255) NOT NULL UNIQUE, PASSWORD VARCHAR(255),
	CONSTRAINT USERS_PK PRIMARY KEY (ID));
	
CREATE TABLE IF NOT EXISTS PROFILES (ID SERIAL NOT NULL, NAME VARCHAR(255) NOT NULL, DESCRIPTION VARCHAR(2000),
	CONSTRAINT PROFILES_PK PRIMARY KEY (ID));

CREATE TABLE IF NOT EXISTS SECTIONS (ID SERIAL NOT NULL, NAME VARCHAR(255) NOT NULL, DESCRIPTION VARCHAR(2000), ALIAS VARCHAR(255) NOT NULL UNIQUE,
	CONSTRAINT SECTIONS_PK PRIMARY KEY(ID));

CREATE TABLE IF NOT EXISTS PROFILES_SECTIONS_MAP (PROFILE_ID INTEGER NOT NULL, SECTION_ID INTEGER NOT NULL, 
	CONSTRAINT PROFILES_SECTIONS_MAP_PK PRIMARY KEY (PROFILE_ID, SECTION_ID),
	CONSTRAINT PROFILES_SECTIONS_MAP_FK1 FOREIGN KEY (PROFILE_ID) REFERENCES PROFILES (ID), 
	CONSTRAINT PROFILES_SECTIONS_MAP_FK2 FOREIGN KEY (SECTION_ID) REFERENCES SECTIONS (ID));

CREATE TABLE IF NOT EXISTS USERS_PROFILES_MAP (USER_ID INTEGER NOT NULL, PROFILE_ID INTEGER NOT NULL,
	CONSTRAINT USERS_PROFILES_MAP_PK PRIMARY KEY (USER_ID, PROFILE_ID),
	CONSTRAINT USERS_PROFILES_MAP_FK1 FOREIGN KEY (USER_ID) REFERENCES USERS (ID),
	CONSTRAINT USERS_PROFILES_MAP_FK2 FOREIGN KEY (PROFILE_ID) REFERENCES PROFILES (ID));
	