SQLite format 3   @    �            `                                                � .O| 	  ��
Ye	 3�8�                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  �V ##�wviewALL_RESULTSALL_RESULTSCREATE VIEW ALL_RESULTS AS SELECT p.user_id, p.race_id, pred, drivers, constructors, drivers_distance, drivers_good, cons_distance, cons_good, points

FROM
    PREDICTIONS p
    INNER JOIN RACES_RESULTS r ON r.race_id = p.race_id
    INNER JOIN TOTAL_SCORE s ON s.user_id = p.user_id AND s.race_id = p.race_id�@%%�CtablePREDS_SCORESPREDS_SCORESCREATE TABLE PREDS_SCORES (user_id VARCHAR (50), race_id INTEGER, drivers_distance INTEGER, drivers_good INTEGER, cons_distance INTEGER, cons_good INTEGER)� ;;�ota�: �[v�/*##�%tablePREDICTIONSPREDICTIONSCREATE TABLE PREDICTIONS (
    user_id    VARCHAR (20),
    race_id    INT,
    pred       VARCHAR (110) DEFAULT "['NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN']",
    message_id VARCHAR (20) 
)�##�[viewTOTAL_SCORETOTAL_SCORECREATE VIEW TOTAL_SCORE AS SELECT *, 10*drivers_good + drivers_distance as points
FROM
    PREDS_SCORES�3''�%tableRACES_RESULTSRACES_RESULTSCREATE TABLE RACES_RESULTS (race_id INTEGER (6) NOT NULL, status INTEGER (1) NOT NULL DEFAULT (0), drivers VARCHAR (110), constructors BLOB)G ;;�Stablesql     �''�GtablePREDS_CHANNELPREDS_CHANNELCREATE TABLE PREDS_CHANNEL (guild_id VARCHAR (50) NOT NULL, channel_id VARCHAR (50) NOT NULL)   �+� %;;�Wtablesqlitestudio_temp_tablesqlitestudio_temp_tableCREATE TABLE sqlitestudio� );;�Wtablesqlitestudio_temp_tablesqlitestudio_temp_tableCREATE TABLE sqlitestudio_temp_table(
  user_id TEXT,
  race_id INT,
  pred TEXT,
  mesb,+#�indexI_PREDS_USER_IDPREDICTIONSCREATE INDEX I_PREDS_USER_ID ON PREDICTIONS (
    user_id
)b++#�indexI_PREDS_RACE_IDPREDICTIONSCREATE INDEX I_PREDS_RACE_ID ON PREDICTIONS (
    race_id
)   I W��I                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         �&1�1351822142989402123�['NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN']901955071154225232�91�%1394904990352801802�['HAM', 'BOT', 'NOR', 'PER', 'RIC', 'GAS', 'LEC', 'OCO', 'ALO', 'VET', 'STR', 'TSU', 'RUS', 'GIO', 'RAI', 'LAT', 'MSC', 'MAZ', 'VER', 'SAI']897398478257393674�&1�1661169840815603763�['VER','HAM','PER','BOT','LEC','NOR','SAI','RIC','GAS','OCO','STR','RUS','VET','ALO','RAI','TSU','GIO','LAT','MSC','MAZ']901864304700182578�&1�1351822142989402123�['HAM','BOT','VER','NOR','LEC','SAI','GAS','RIC','PER','STR','OCO','VET','RUS','RAI','TSU','LAT','MSC','MAZ','ALO','GIO']901900238271430686
   � ����                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 ���	�   � ��                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           �%�%z�� 
�['HAM', 'BOT', 'NOR', 'PER', 'RIC', 'GAS', 'LEC', 'OCO', 'ALO', 'VET', 'STR', 'TSU', 'RUS', 'GIO', 'RAI', 'LAT', 'MSC', 'MAZ', 'VER  ��T	��/�['BOT','VER','PER','LEC','HAM','GAS','NOR','SAI','STR','OCO','GIO','RAI','RIC','TSU','RUS','ALO','LAT','VET','MSC','MAZ']['mercedes','red_bull','red_bull','ferrari','mercedes','alphatauri','mclaren','ferrari','aston_martin','alpine','alfa','alfa',''11891000842788937748891106826538582086'11853749415927349310875129553381625867              �������                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           �&1�1351822142989402123�['NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN']901955071154225232�91�%1394904990352801802�['HAM', 'BOT', 'NOR', 'PER', 'RIC', 'GAS', 'LEC', 'OCO', 'ALO', 'VET', 'STR', 'TSU', 'RUS', 'GIO', 'RAI', 'LAT', 'MSC', 'MAZ', 'VER', 'SAI']897398478257393674�&1�1661169840815603763�['VER','HAM','PER','BOT','LEC','NOR','SAI','RIC','GAS','OCO','STR','RUS','VET','ALO','RAI','TSU','GIO','LAT','MSC','MAZ']901864304700182578�&1�1351822142989402123�['HAM','BOT','VER','NOR','LEC','SAI','GAS','RIC'1661169840815603763139490499035280180213518221429894021231	351822142989402123   H �RH                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            ��T	��/�['VER','HAM','PER','LEC','RIC','BOT','SAI','NOR','TSU','VET','GIO','STR','RAI','RUS','LAT','MSC','MAZ','ALO','OCO','GAS']['red_bull','mercedes','red_bull','ferrari','mclaren','mercedes','ferrari','mclaren','alphatauri','aston_martin','alfa','aston_martin','alfa','williams','williams','haas','haas','alpine','alpine','alphatauri']�T	��/�['BOT','VER','PER','LEC','HAM','GAS','NOR','SAI','STR','OCO','GIO','RAI','RIC','TSU','RUS','ALO','LAT','VET','MSC','MAZ']['mercedes','red_bull','red_bull','ferrari','mercedes','alphatauri','mclaren','ferrari','aston_martin','alpine','alfa','alfa','mclaren','alphatauri','williams','alpine','williams','aston_martin','haas','haas']   � ��������                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
	892318238355095562�HX   �	547905866255433758�Tn   �273810441451601922�B   �724585351707885589�B   �	325332914944475137�>T 1394904990352801802�lr"1661169840815603763� � �!1351822142989402123� � �
   � ����                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     1661169840815603763139490499035280180213518221429894021231	351822142989402123