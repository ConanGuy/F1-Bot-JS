SQLite format 3   @    q            N                                                q .O| 	  �G��
Ye	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     �V ##�wviewALL_RESULTSALL_RESULTSCREATE VIEW ALL_RESULTS AS SELECT p.user_id, p.race_id, pred, drivers, constructors, drivers_distance, drivers_good, cons_distance, cons_good, points

FROM
    PREDICTIONS p
    INNER JOIN RACES_RESULTS r ON r.race_id = p.race_id
    INNER JOIN TOTAL_SCORE s ON s.user_id = p.user_id AND s.race_id = p.race_id�@%%�CtablePREDS_SCORESPREDS_SCORESCREATE TABLE PREDS_SCORES (user_id VARCHAR (50), race_id INTEGER, drivers_distance INTEGER, drivers_good INTEGER, cons_distance INTEGER, cons_good INTEGER)�I;;�ota�: �[viewTESTTESTCREATE VIEW TEST AS SELECT p.user_id, p.race_id, pred, drivers, constructors, drivers_distance, drivers_good, cons_distance, cons_good

FROM
    PREDICTIONS p
    INNER JOIN RACES_RESULTS r ON r.race_id = p.race_id
    INNER JOIN PREDS_SCORES s ON s.user_id = p.user_id AND s.race_id = p      �##�[viewTOTAL_SCORETOTAL_SCORECREATE VIEW TOTAL_SCORE AS SELECT *, 10*drivers_good + drivers_distance as points
FROM
    PREDS_SCORES�3''�%tableRACES_RESULTSRACES_RESULTSCREATE TABLE RACES_RESULTS (race_id INTEGER (6) NOT NULL, status INTEGER (1) NOT NULL DEFAULT (0), drivers VARCHAR (110), constructors BLOB)   ;;�Stablesql     �''�GtablePREDS_CHANNELPREDS_CHANNELCREATE TABLE PREDS_CHANNEL (guild_id VARCHAR (50) NOT NULL, channel_id VARCHAR (50) NOT NULL)[+#windexI_PREDS_RACE_IDPREDICTIONSCREATE INDEX I_PREDS_RACE_ID ON PREDICTIONS (race_id)[+#windexI_PREDS_USER_IDPREDICTIONSCREATE INDEX I_PREDS_USER_ID ON PREDICTIONS (user_id)�|##�?tablePREDICTIONSPREDICTIONSCREATE TABLE PREDICTIONS (user_id VARCHAR (20), race_id int, pred varchar (110) DEFAULT '[None,None,None,None,None,None,None,None,None,None,None,None,None,None,None,None,None,None,None,None]', message_id VARCHAR (20))D � W��llllllll                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    	� �1�% 273810441451601922�['LAT', 'TSU', 'HAM', 'ALO', 'OCO', 'VET', 'RUS', 'RIC', 'GIO', 'MSC', 'NOR', 'VER', 'RAI', 'LEC', 'MAZ', 'PER', 'STR', 'BOT', 'SAI', 'GAS']D`1�% 892318238355095562�['TSU', 'MAZ', 'BOT', 'PER', 'RUS', 'LAT', 'GIO', 'NOR', 'LEC', 'HAM', 'VER', 'MSC', 'SAI', 'GAS', 'STR', 'RAI', 'VET', 'RIC', 'OCO', 'ALO']D�1�% 547905866255433758�['GIO', 'HAM', 'NOR', 'LAT', 'OCO', 'BOT', 'VET', 'GAS', 'TSU', 'RAI', 'RIC', 'PER', 'RUS', 'SAI', 'LEC', 'ALO', 'VER', 'STR', 'MAZ', 'MSC']D1� 273810441451601922�['BOT','HAM','NaN','NaN','PER','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','MAZ']�'1�% 724585351707885589�['LAT', 'TSU', 'HAM', 'ALO', 'OCO', 'VET', 'RUS', 'RIC', 'GIO', 'MSC', 'NOR', 'VER', 'RAI', 'LEC', 'MAZ', 'PER', 'STR', 'BOT', 'SAI', 'GAS']D�1�% 325332914944475137�['OCO', 'HAM', 'MAZ', 'SAI', 'RIC', 'LEC', 'VER', 'MSC', 'LAT', 'ALO', 'BOT', 'RUS', 'NOR', 'PER', 'GAS', 'GIO', 'TSU', 'VET', 'STR', 'RAI']D!1�%1394904990352801802�['HAM', 'BOT', 'NOR', 'PER', 'RIC', 'GAS', 'LEC', 'OCO', 'ALO', 'VET', 'STR', 'TSU', 'RUS', 'GIO', 'RAI', 'LAT', 'MSC', 'MAZ', 'VER', 'SAI']351822142989402123De1�%1661169840815603763�['HAM', 'BOT', 'VER', 'PER', 'NOR', 'RIC', 'LEC', 'SAI', 'GAS', 'TSU', 'VET', 'STR', 'ALO', 'OCO', 'RUS', 'LAT', 'RAI', 'GIO', 'MSC', 'MAZ']897378883576410162D �1�1351822142989402123�['HAM','BOT','VER','NOR','LEC','SAI','GAS','RIC','PER','STR','OCO','VET','RUS','RAI','TSU','LAT','MSC','MAZ','ALO','GIO']899778337755504651�91�%1394904990352801802�['HAM', 'BOT', 'NOR', 'PER', 'RIC', 'GAS', 'LEC', 'OCO', 'ALO', 'VET', 'STR', 'TSU', 'RUS', 'GIO', 'RAI', 'LAT', 'MSC', 'MAZ', 'VER', 'SAI']897398478257393674�91�%1661169840815603763�['HAM', 'BOT', 'VER', 'PER', 'NOR', 'RIC', 'LEC', 'SAI', 'GAS', 'TSU', 'VET', 'STR', 'ALO', 'OCO', 'RUS', 'LAT', 'RAI', 'GIO', 'MSC', 'MAZ']897378883576410162   1�%13518221429�&1�1351822142989402123�['HAM','BOT','VER','NOR','LEC','SAI','GAS','RIC','PER','STR','OCO','VET','RUS','RAI','TSU','LAT','MSC','MAZ','ALO','GIO']901217761907343390
   � ���                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         �892318238355095562   �547905866255433758
   �273810441451601922	   s724585351707885589   \325332914944475137   E394904990352801802   .661169840815603763   351822142989402123166116984081560376313949049903528018021	351822142989402123   � ��                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           �%�%z�� 
�['HAM', 'BOT', 'NOR', 'PER', 'RIC', 'GAS', 'LEC', 'OCO', 'ALO', 'VET', 'STR', 'TSU', 'RUS', 'GIO', 'RAI', 'LAT', 'MSC', 'MAZ', 'VER  ��T	��/�['BOT','VER','PER','LEC','HAM','GAS','NOR','SAI','STR','OCO','GIO','RAI','RIC','TSU','RUS','ALO','LAT','VET','MSC','MAZ']['mercedes','red_bull','red_bull','ferrari','mercedes','alphatauri','mclaren','ferrari','aston_martin','alpine','alfa','alfa',''11891000842788937748891106826538582086'11853749415927349310875129553381625867
   � �����������                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            �/�%1z�� 
�['HAM', 'BOT', 'NOR', 'PER', 'RIC', 'GAS', 'LEC', 'OCO', 'ALO', 'VET', 'STR', 'TSU', 'RUS', 'GIO', 'RAI', 'LAT', 'MSC', 'MAZ', 'VER', 'SAI']897398478257393674�/�%1	,�w� 3�['HAM', 'BOT', 'VER', 'PER', 'NOR', 'RIC', 'LEC', 'SAI', 'GAS', 'TSU', 'VET', 'STR', 'ALO', 'OCO', 'RUS', 'LAT', 'RAI', 'GIO', 'MSC', 'MAZ']897378883576410162�/�%1��`  �['HAM', 'VER', 'BOT', 'NOR', 'LEC', 'GAS', 'RIC', 'PER', 'SAI', 'RUS',    @�   8�
   0�	   (�    �   �   �   ���	�   � ���                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      �  �	�+�[�)BOT,VER,PER,LEC,HAM,GAS,NOR,SAI,STR,OCO,GIO,RAI,RIC,TSU,RUS,ALO,LAT,VET,MSC,MAZmercedes,red_bull,red_bull,ferrari,mercedes,alphatauri,mclaren,fe       ��T	��/�['BOT','VER','PER','LEC','HAM','GAS','NOR','SAI','STR','OCO','GIO','RAI','RIC','TSU','RUS','ALO','LAT','VET','MSC','MAZ']['mercedes','red_bull','red_bull','ferrari','mercedes','alphatauri','mclaren','ferrari','aston_martin','alpine','alfa','alfa','mclaren','alphatauri','williams','alpine','williams','aston_martin','haas','haas']      ��������                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
	892318238355095562�HX   �	547905866255433758�Tn   �273810441451601922�B   �724585351707885589�B   �	325332914944475137�>T   h	394904990352801802�tx   G661169840815603763� � �   #351822142989402123� � �                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                