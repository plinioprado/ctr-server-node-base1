DROP TABLE IF EXISTS ctr.currency;

CREATE TABLE ctr.currency (
  cod VARCHAR(3) PRIMARY KEY,
  cod_numeric INTEGER NOT NULL,
  "name" VARCHAR(30) NOT NULL,
  digits INTEGER DEFAULT 2,
  countries VARCHAR(240) DEFAULT '',
  obs VARCHAR(240) DEFAULT '',
  active BOOLEAN DEFAULT TRUE
);

INSERT INTO
  ctr.currency (cod, cod_numeric, name, digits, countries, obs, active )
  VALUES
  ('AED', 784, 'United Arab Emirates dirham', 2, 'ARE', '', FALSE),
  ('AFN', 971, 'Afghan afghani', 2, 'AFG', '', FALSE),
  ('ALL', 8, 'Albanian lek', 2, 'ALB', '', FALSE),
  ('AMD', 51, 'Armenian dram', 2, 'ARM', '', FALSE),
  ('ANG', 532, 'Netherlands Antillean guilder', 2, 'CUW,SXM', '', FALSE),
  ('AOA', 973, 'Angolan kwanza', 2, 'AGO', '', FALSE),
  ('ARS', 32, 'Argentine peso', 2, 'ARG', '', FALSE),
  ('AUD', 36, 'Australian dollar', 2, 'AUS,CXR,CCK,HMD,KIR,NRU,NFK,TUV', '', TRUE),
  ('AWG', 533, 'Aruban florin', 2, 'ABW', '', FALSE),
  ('AZN', 944, 'Azerbaijani manat', 2, 'AZE', '', FALSE),
  ('BAM', 977, 'Bosnia and Herzegovina mark', 2, 'BIH', '', FALSE),
  ('BBD', 52, 'Barbados dollar', 2, 'BRB', '', FALSE),
  ('BDT', 50, 'Bangladeshi taka', 2, 'BGD', '', FALSE),
  ('BGN', 975, 'Bulgarian lev', 2, 'BGR', '', FALSE),
  ('BHD', 48, 'Bahraini dinar', 3, 'BHR', '', FALSE),
  ('BIF', 108, 'Burundian franc', 0, 'BDI', '', FALSE),
  ('BMD', 60, 'Bermudian dollar', 2, 'BMU', '', FALSE),
  ('BND', 96, 'Brunei dollar', 2, 'BRN', '', FALSE),
  ('BOB', 68, 'Boliviano', 2, 'BOL', '', FALSE),
  ('BOV', 984, 'Bolivian Mvdol', 2, 'BOL', 'Funds code', FALSE),
  ('BRL', 986, 'Brazilian real', 2, 'BRA', '', FALSE),
  ('BSD', 44, 'Bahamian dollar', 2, 'BHS', '', FALSE),
  ('BTN', 64, 'Bhutanese ngultrum', 2, 'BTN', '', FALSE),
  ('BWP', 72, 'Botswana pula', 2, 'BWA', '', FALSE),
  ('BYN', 933, 'Belarusian ruble', 2, 'BLR', '', FALSE),
  ('BZD', 84, 'Belize dollar', 2, 'BLZ', '', FALSE),
  ('CAD', 124, 'Canadian dollar', 2, 'CAN', '', TRUE),
  ('CDF', 976, 'Congolese franc', 2, 'COD', '', FALSE),
  ('CHE', 947, 'WIR euro', 2, 'CHE', 'Complementary currency', FALSE),
  ('CHF', 756, 'Swiss franc', 2, 'CHE,LIE', '', FALSE),
  ('CHW', 948, 'WIR franc', 2, 'CHE', 'Complementary currency', FALSE),
  ('CLF', 990, 'Unidad de Fomento', 4, 'CHL', 'Funds code', FALSE),
  ('CLP', 152, 'Chilean peso', 0, 'CHL', '', FALSE),
  ('CNY', 156, 'Renminbi', 2, 'CHN', '', FALSE),
  ('COP', 170, 'Colombian peso', 2, 'COL', '', FALSE),
  ('COU', 970, 'Unidad de Valor Real (UVR)', 2, 'COL', '', FALSE),
  ('CRC', 188, 'Costa Rican colon', 2, 'CRI', '', FALSE),
  ('CUC', 931, 'Cuban convertible peso', 2, 'CUB', '', FALSE),
  ('CUP', 192, 'Cuban peso', 2, 'CUB', '', FALSE),
  ('CVE', 132, 'Cape Verdean escudo', 2, 'CPV', '', FALSE),
  ('CZK', 203, 'Czech koruna', 2, 'CZE', '', FALSE),
  ('DJF', 262, 'Djiboutian franc', 0, 'DJI', '', FALSE),
  ('DKK', 208, 'Danish krone', 2, 'DNK,FRO,GRL', '', FALSE),
  ('DOP', 214, 'Dominican peso', 2, 'DOM', '', FALSE),
  ('DZD', 12, 'Algerian dinar', 2, 'DZA', '', FALSE),
  ('EGP', 818, 'Egyptian pound', 2, 'EGY', '', FALSE),
  ('ERN', 232, 'Eritrean nakfa', 2, 'ERI', '', FALSE),
  ('ETB', 230, 'Ethiopian birr', 2, 'ETH', '', FALSE),
  ('EUR', 978, 'Euro', 2, 'AND,ATF,AUT,BEL,BLM,CYP,DEU,ESP,EST,FIN,FRA,GLP,GRC,GUF,HRV,IRL,ITA,LTU,LUX,LVA,MAF,MCO,MLT,MNE,MTQ,MYT,NLD,PRT,REU,SMR,SPM,SVK,SVN,VAT', 'Includes EU and Kosovo', TRUE),
  ('FJD', 242, 'Fiji dollar', 2, 'FJI', '', FALSE),
  ('FKP', 238, 'Falkland Islands pound', 2, 'FLK', 'Pegged to GBP 1:1', FALSE),
  ('GBP', 826, 'Pound sterling', 2, 'GBR,IMN,JEY,GGY,SHN', '', TRUE),
  ('GEL', 981, 'Georgian lari', 2, 'GEO', '', FALSE),
  ('GHS', 936, 'Ghanaian cedi', 2, 'GHA', '', FALSE),
  ('GIP', 292, 'Gibraltar pound', 2, 'GIB', 'Pegged to GBP 1:1', FALSE),
  ('GMD', 270, 'Gambian dalasi', 2, 'GMB', '', FALSE),
  ('GNF', 324, 'Guinean franc', 0, 'GIN', '', FALSE),
  ('GTQ', 320, 'Guatemalan quetzal', 2, 'GTM', '', FALSE),
  ('GYD', 328, 'Guyanese dollar', 2, 'GUY', '', FALSE),
  ('HKD', 344, 'Hong Kong dollar', 2, 'HKG', '', FALSE),
  ('HNL', 340, 'Honduran lempira', 2, 'HND', '', FALSE),
  ('HTG', 332, 'Haitian gourde', 2, 'HTI', '', FALSE),
  ('HUF', 348, 'Hungarian forint', 2, 'HUN', '', FALSE),
  ('IDR', 360, 'Indonesian rupiah', 2, 'IDN', '', FALSE),
  ('ILS', 376, 'Israeli new shekel', 2, 'ISR', '', FALSE),
  ('INR', 356, 'Indian rupee', 2, 'IND,BTN', '', FALSE),
  ('IQD', 368, 'Iraqi dinar', 3, 'IRQ', '', FALSE),
  ('IRR', 364, 'Iranian rial', 2, 'IRN', '', FALSE),
  ('ISK', 352, 'Icelandic króna', 0, 'ISL', 'plural: krónur', FALSE),
  ('JMD', 388, 'Jamaican dollar', 2, 'JAM', '', FALSE),
  ('JOD', 400, 'Jordanian dinar', 3, 'JOR', '', FALSE),
  ('JPY', 392, 'Japanese yen', 0, 'JPN', '', FALSE),
  ('KES', 404, 'Kenyan shilling', 2, 'KEN', '', FALSE),
  ('KGS', 417, 'Kyrgyzstani som', 2, 'KGZ', '', FALSE),
  ('KHR', 116, 'Cambodian riel', 2, 'KHM', '', FALSE),
  ('KMF', 174, 'Comoro franc', 0, 'COM', '', FALSE),
  ('KPW', 408, 'North Korean won', 2, 'PRK', '', FALSE),
  ('KRW', 410, 'South Korean won', 0, 'KOR', '', FALSE),
  ('KWD', 414, 'Kuwaiti dinar', 3, 'KWT', '', FALSE),
  ('KYD', 136, 'Cayman Islands dollar', 2, 'CYM', '', FALSE),
  ('KZT', 398, 'Kazakhstani tenge', 2, 'KAZ', '', FALSE),
  ('LAK', 418, 'Lao kip', 2, 'LAO', '', FALSE),
  ('LBP', 422, 'Lebanese pound', 2, 'LBN', '', FALSE),
  ('LKR', 144, 'Sri Lankan rupee', 2, 'LKA', '', FALSE),
  ('LRD', 430, 'Liberian dollar', 2, 'LBR', '', FALSE),
  ('LSL', 426, 'Lesotho loti', 2, 'LSO', '', FALSE),
  ('LYD', 434, 'Libyan dinar', 3, 'LBY', '', FALSE),
  ('MAD', 504, 'Moroccan dirham', 2, 'MAR,ESH', '', FALSE),
  ('MDL', 498, 'Moldovan leu', 2, 'MDA', '', FALSE),
  ('MGA', 969, 'Malagasy ariary', 2, 'MDG', '', FALSE),
  ('MKD', 807, 'Macedonian denar', 2, 'MKD', '', FALSE),
  ('MMK', 104, 'Myanmar kyat', 2, 'MMR', '', FALSE),
  ('MNT', 496, 'Mongolian tögrög', 2, 'MNG', '', FALSE),
  ('MOP', 446, 'Macanese pataca', 2, 'MAC', '', FALSE),
  ('MRU', 929, 'Mauritanian ouguiya', 2, 'MRT', '', FALSE),
  ('MUR', 480, 'Mauritian rupee', 2, 'MUS', '', FALSE),
  ('MVR', 462, 'Maldivian rufiyaa', 2, 'MDV', '', FALSE),
  ('MWK', 454, 'Malawian kwacha', 2, 'MWI', '', FALSE),
  ('MXN', 484, 'Mexican peso', 2, 'MEX', '', FALSE),
  ('MXV', 979, 'Mexican Unidad de Inversion', 2, 'MEX', 'Mexican Unidad de Inversion (UDI) (funds code)', FALSE),
  ('MYR', 458, 'Malaysian ringgit', 2, 'MYS', '', FALSE),
  ('MZN', 943, 'Mozambican metical', 2, 'MOZ', '', FALSE),
  ('NAD', 516, 'Namibian dollar', 2, 'NAM', 'Pegged to ZAR 1:1', FALSE),
  ('NGN', 566, 'Nigerian naira', 2, 'NGA', '', FALSE),
  ('NIO', 558, 'Nicaraguan córdoba', 2, 'NIC', '', FALSE),
  ('NOK', 578, 'Norwegian krone', 2, 'NOR,SIM,BVT', '', FALSE),
  ('NPR', 524, 'Nepalese rupee', 2, 'NPL', '', FALSE),
  ('NZD', 554, 'New Zealand dollar', 2, 'NZL', '', FALSE),
  ('OMR', 512, 'Omani rial', 3, 'OMN', '', FALSE),
  ('PAB', 590, 'Panamanian balboa', 2, 'PAN', '', FALSE),
  ('PEN', 604, 'Peruvian sol', 2, 'PER', '', FALSE),
  ('PGK', 598, 'Papua New Guinean kina', 2, 'PNG', '', FALSE),
  ('PHP', 608, 'Philippine peso', 2, 'PHL', '', FALSE),
  ('PKR', 586, 'Pakistani rupee', 2, 'PAK', '', FALSE),
  ('PLN', 985, 'Polish złoty', 2, 'POL', '', FALSE),
  ('PYG', 600, 'Paraguayan guaraní', 0, 'PRY', '', FALSE),
  ('QAR', 634, 'Qatari riyal', 2, 'QAT', '', FALSE),
  ('RON', 946, 'Romanian leu', 2, 'ROU', '', FALSE),
  ('RSD', 941, 'Serbian dinar', 2, 'SRB', '', FALSE),
  ('RUB', 643, 'Russian ruble', 2, 'RUS', '', FALSE),
  ('RWF', 646, 'Rwandan franc', 0, 'RWA', '', FALSE),
  ('SAR', 682, 'Saudi riyal', 2, 'SAU', '', FALSE),
  ('SBD', 90, 'Solomon Islands dollar', 2, 'SLB', '', FALSE),
  ('SCR', 690, 'Seychelles rupee', 2, 'SYC', '', FALSE),
  ('SDG', 938, 'Sudanese pound', 2, 'SDN', '', FALSE),
  ('SEK', 752, 'Swedish krona', 2, 'SWE', 'Plural: kronor', FALSE),
  ('SGD', 702, 'Singapore dollar', 2, 'SGP', '', FALSE),
  ('SHP', 654, 'Saint Helena pound', 2, 'CXR', 'Saint Helena (SH-SH), Ascension Island (SH-AC)', FALSE),
  ('SLE', 925, 'Sierra Leonean leone (new)', 2, 'SLE', '', FALSE),
  ('SLL', 694, 'Sierra Leonean leone (old)', 2, 'SLE', '', FALSE),
  ('SOS', 706, 'Somali shilling', 2, 'SOM', '', FALSE),
  ('SRD', 968, 'Surinamese dollar', 2, 'SUR', '', FALSE),
  ('SSP', 728, 'South Sudanese pound', 2, 'SSD', '', FALSE),
  ('STN', 930, 'São Tomé and Príncipe dobra', 2, 'STP', '', FALSE),
  ('SVC', 222, 'Salvadoran colón', 2, 'SLV', '', FALSE),
  ('SYP', 760, 'Syrian pound', 2, 'SYR', '', FALSE),
  ('SZL', 748, 'Swazi lilangeni', 2, 'SWZ', '', FALSE),
  ('THB', 764, 'Thai baht', 2, 'THA', '', FALSE),
  ('TJS', 972, 'Tajikistani somoni', 2, 'TJK', '', FALSE),
  ('TMT', 934, 'Turkmenistan manat', 2, 'TKM', '', FALSE),
  ('TND', 788, 'Tunisian dinar', 3, 'TUN', '', FALSE),
  ('TOP', 776, 'Tongan paanga', 2, 'TON', '', FALSE),
  ('TRY', 949, 'Turkish lira', 2, 'TUR', '', FALSE),
  ('TTD', 780, 'Trinidad and Tobago dollar', 2, 'TTO', '', FALSE),
  ('TWD', 901, 'New Taiwan dollar', 2, 'TWN', '', FALSE),
  ('TZS', 834, 'Tanzanian shilling', 2, 'TZA', '', FALSE),
  ('UAH', 980, 'Ukrainian hryvnia', 2, 'UKR', '', FALSE),
  ('UGX', 800, 'Ugandan shilling', 0, 'UGA', '', FALSE),
  ('USD', 840, 'United States dollar', 2, 'USA,ASM,IOT,VGB,BES,ECU,SLV,GUM,MHL,FSM,MNP,PLW,PAN,PRI,TLS,TCA,VIR,UMI', 'British Indian Ocean Territory (IO) also uses GB', FALSE),
  ('USN', 997, 'United States dollar Next day', 2, 'USA', '', TRUE),
  ('UYI', 940, 'Uruguay Peso en Uni.Indexadas', 0, 'URY', 'Uruguay Peso en Unidades Indexadas (URUIURUI) (funds code)', FALSE),
  ('UYU', 858, 'Uruguayan peso', 2, 'URY', '', FALSE),
  ('UYW', 927, 'Unidad previsional', 4, 'URY', '', FALSE),
  ('UZS', 860, 'Uzbekistan sum', 2, 'UZB', '', FALSE),
  ('VED', 926, 'Venezuelan digital bolívar', 2, 'VEN', '', FALSE),
  ('VES', 928, 'Venezuelan sovereign bolívar', 2, 'VEN', '', FALSE),
  ('VND', 704, 'Vietnamese đồng', 0, 'VNM', '', FALSE),
  ('VUV', 548, 'Vanuatu vatu', 0, 'VUT', '', FALSE),
  ('WST', 882, 'Samoan tala', 2, 'WSM', '', FALSE),
  ('XAF', 950, 'CFA franc BEAC', 0, 'CMR,CAF,COG,TCD,GNQ,GAB', '', FALSE),
  ('XAG', 961, 'Silver', 0, '', 'One troy ounce', FALSE),
  ('XAU', 959, 'Gold', 0, '', 'One troy ounce', FALSE),
  ('XBA', 955, 'European Composite Unit', 0, '', 'European Composite Unit (EURCO) (bond market unit)', FALSE),
  ('XBB', 956, 'European Monetary Unit', 0, '', 'European Monetary Unit (E.M.U.-6) (bond market unit)', FALSE),
  ('XBC', 957, 'European Unit of Account 9 ', 0, '', 'European Unit of Account 9 (E.U.A.-9) (bond market unit)', FALSE),
  ('XBD', 958, 'European Unit of Account 17', 0, '', 'European Unit of Account 17 (E.U.A.-17) (bond market unit)', FALSE),
  ('XCD', 951, 'East Caribbean dollar', 2, 'AIA,ATG,DMA,GRD,MSR,KNA,LCA,VCT', '', FALSE),
  ('XDR', 960, 'Special drawing rights', 0, '', 'International Monetary Fund', FALSE),
  ('XOF', 952, 'CFA franc BCEAO', 0, 'BEN,BFA,CIV,GNB,MLI,NER,SEN,TGO', '', FALSE),
  ('XPD', 964, 'Palladium', 0, '', 'One troy ounce', FALSE),
  ('XPF', 953, 'CFP franc', 0, 'FYF,NCL,WLF', 'Franc Pacifique', FALSE),
  ('XPT', 962, 'Platinum', 0, '', 'One troy ounce', FALSE),
  ('XSU', 994, 'SUCRE', 0, '', 'Unified System for Regional Compensation of Bolivarian Alliance', FALSE),
  ('XTS', 963, 'Code reserved for testing', 0, '', '', FALSE),
  ('XUA', 965, 'ADB Unit of Account', 0, '', 'frican Development Bank', FALSE),
  ('XXX', 999, 'No currency', 0, '', '', FALSE),
  ('YER', 886, 'Yemeni rial', 2, 'YEM', '', FALSE),
  ('ZAR', 710, 'South African rand', 2, 'SWZ,LSO,NAM,ZAF', '', FALSE),
  ('ZMW', 967, 'Zambian kwacha', 2, 'ZMB', '', FALSE),
  ('ZWL', 932, 'Zimbabwean dollar', 2, 'ZWE', 'Fifth', FALSE);