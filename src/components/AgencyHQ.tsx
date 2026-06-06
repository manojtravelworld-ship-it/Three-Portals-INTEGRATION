// @ts-nocheck
import { useState, useRef, useEffect } from "react";

const INDIA = {"Andhra Pradesh":{"Visakhapatnam":["Bheemunipatnam","Visakhapatnam","Anakapalle","Chodavaram","Paderu"],"Krishna":["Vijayawada","Machilipatnam","Gudivada","Nandigama"],"Guntur":["Guntur","Tenali","Narasaraopet","Sattenapalle"],"East Godavari":["Kakinada","Rajahmundry","Amalapuram","Rampachodavaram"],"West Godavari":["Eluru","Bhimavaram","Narsapur","Tanuku"],"Chittoor":["Chittoor","Tirupati","Madanapalle","Puttur"],"Kurnool":["Kurnool","Nandyal","Adoni","Yemmiganur"],"Kadapa":["Kadapa","Proddatur","Jammalamadugu","Badvel"],"Nellore":["Nellore","Kavali","Gudur","Atmakur"],"Prakasam":["Ongole","Markapur","Giddalur","Kandukur"]},"Arunachal Pradesh":{"Itanagar Capital Complex":["Itanagar","Naharlagun","Nirjuli"],"East Kameng":["Seppa","Bana","Chayang Tajo"],"West Kameng":["Bomdila","Dirang","Kalaktang"],"Papum Pare":["Yupia","Doimukh","Balijan"],"Upper Subansiri":["Daporijo","Taliha","Nacho"]},"Assam":{"Kamrup Metropolitan":["Guwahati","Dispur","Azara","Jalukbari"],"Kamrup":["Rangia","Boko","Hajo","Kamalpur"],"Dibrugarh":["Dibrugarh","Naharkatia","Duliajan","Moran"],"Jorhat":["Jorhat","Titabar","Majuli","Mariani"],"Nagaon":["Nagaon","Hojai","Lumding","Raha"],"Cachar":["Silchar","Sonai","Lakhipur","Katigorah"],"Sonitpur":["Tezpur","Dhekiajuli","Biswanath","Gohpur"],"Barpeta":["Barpeta","Sorbhog","Chenga","Bajali"],"Darrang":["Mangaldoi","Kalaigaon","Sipajhar"],"Bongaigaon":["Bongaigaon","Bijni","Sidli"]},"Bihar":{"Patna":["Patna Sadar","Patna City","Danapur","Fatuha","Barh","Mokama","Masaurhi"],"Gaya":["Gaya","Bodh Gaya","Sherghati","Nawada","Aurangabad"],"Muzaffarpur":["Muzaffarpur","Sitamarhi","Sheohar","Motihari"],"Bhagalpur":["Bhagalpur","Banka","Kahalgaon","Naugachhia"],"Darbhanga":["Darbhanga","Madhubani","Samastipur"],"Saran":["Chapra","Siwan","Gopalganj","Maharajganj"],"Purnia":["Purnia","Araria","Kishanganj","Katihar"],"Begusarai":["Begusarai","Lakhisarai","Sheikhpura"],"Nalanda":["Bihar Sharif","Rajgir","Hilsa","Islampur"],"Rohtas":["Sasaram","Buxar","Arrah","Bhabua"]},"Chhattisgarh":{"Raipur":["Raipur","Arang","Abhanpur","Tilda"],"Bilaspur":["Bilaspur","Mungeli","Takhatpur","Kota"],"Durg":["Durg","Bhilai","Balod","Bemetara"],"Raigarh":["Raigarh","Sarangarh","Gharghoda","Jashpur"],"Korba":["Korba","Katghora","Pali"],"Rajnandgaon":["Rajnandgaon","Dongargarh","Khairagarh"],"Jagdalpur":["Jagdalpur","Dantewada","Sukma","Bijapur"],"Ambikapur":["Ambikapur","Surajpur","Baikunthpur"]},"Delhi":{"Central Delhi":["Connaught Place","Paharganj","Karol Bagh","Ranjit Nagar","Rajendra Nagar"],"New Delhi":["New Delhi","Chanakyapuri","Moti Bagh","Sarojini Nagar"],"North Delhi":["Civil Lines","Model Town","Burari","Timarpur"],"South Delhi":["Saket","Hauz Khas","Greater Kailash","Vasant Kunj","Mehrauli"],"East Delhi":["Shahdara","Preet Vihar","Vivek Vihar","Patparganj"],"West Delhi":["Janakpuri","Uttam Nagar","Dwarka","Tilak Nagar","Rajouri Garden"],"North East Delhi":["Seelampur","Mustafabad","Bhajanpura","Gokulpuri"],"North West Delhi":["Rohini","Pitampura","Shalimar Bagh","Rani Bagh"],"South West Delhi":["Dwarka","Palam","Bijwasan","Najafgarh"],"South East Delhi":["Lajpat Nagar","Kalkaji","Okhla","Badarpur"]},"Goa":{"North Goa":["Panaji","Mapusa","Calangute","Pernem","Bicholim","Sattari"],"South Goa":["Margao","Vasco da Gama","Ponda","Sanguem","Quepem","Canacona"]},"Gujarat":{"Ahmedabad":["Ahmedabad","Daskroi","Dholka","Viramgam","Sanand","Bavla"],"Surat":["Surat","Bardoli","Mandvi","Olpad","Kamrej"],"Vadodara":["Vadodara","Savli","Padra","Shinor","Vaghodia"],"Rajkot":["Rajkot","Gondal","Jetpur","Upleta","Jasdan"],"Gandhinagar":["Gandhinagar","Mansa","Dehgam","Kalol"],"Kutch":["Bhuj","Anjar","Mundra","Rapar","Nakhatrana"],"Junagadh":["Junagadh","Keshod","Veraval","Manavadar","Talala"],"Amreli":["Amreli","Lathi","Savarkundla","Khambha"],"Anand":["Anand","Petlad","Kheda","Nadiad","Borsad"],"Mehsana":["Mehsana","Unjha","Visnagar","Kheralu","Patan"]},"Haryana":{"Gurugram":["Gurugram","Sohna","Pataudi","Farukh Nagar","Nuh"],"Faridabad":["Faridabad","Ballabhgarh","Palwal","Hathin"],"Hisar":["Hisar","Fatehabad","Sirsa","Barwala","Hansi"],"Rohtak":["Rohtak","Jhajjar","Bahadurgarh","Sampla"],"Panipat":["Panipat","Samalkha","Israna"],"Ambala":["Ambala","Naraingarh","Mulana","Barara"],"Sonipat":["Sonipat","Ganaur","Kharkhoda","Rai"],"Karnal":["Karnal","Assandh","Indri","Nilokheri"],"Kurukshetra":["Kurukshetra","Ladwa","Pehowa","Shahabad"],"Yamunanagar":["Yamunanagar","Jagadhri","Bilaspur","Radaur"]},"Himachal Pradesh":{"Shimla":["Shimla","Rampur","Rohru","Chopal","Theog"],"Kangra":["Dharamsala","Palampur","Nurpur","Dehra","Jawalamukhi"],"Mandi":["Mandi","Sundernagar","Jogindernagar","Sarkaghat"],"Kullu":["Kullu","Manali","Banjar","Ani"],"Solan":["Solan","Nalagarh","Arki","Kasauli"],"Sirmaur":["Nahan","Paonta Sahib","Shillai","Renuka"],"Una":["Una","Bangana","Haroli","Amb"],"Hamirpur":["Hamirpur","Barsar","Bhoranj","Sujanpur"]},"Jharkhand":{"Ranchi":["Ranchi","Namkum","Kanke","Ormanjhi","Bundu"],"Dhanbad":["Dhanbad","Jharia","Sindri","Topchanchi"],"Jamshedpur":["Jamshedpur","Boram","Dhalbhum","Baharagora"],"Hazaribagh":["Hazaribagh","Barhi","Ramgarh","Chatra"],"Bokaro":["Bokaro","Chas","Gomia","Petarbar"],"Giridih":["Giridih","Dhanwar","Tisri","Bengabad"],"Deoghar":["Deoghar","Madhupur","Mohanpur"],"Dumka":["Dumka","Jama","Shikaripara","Ramgarh"]},"Karnataka":{"Bangalore Urban":["Bangalore North","Bangalore South","Anekal","Yelahanka","Rajarajeshwari Nagar"],"Bangalore Rural":["Devanahalli","Doddaballapura","Nelamangala","Hosakote"],"Mysore":["Mysore","Nanjangud","Hunsur","Heggadadevankote","T Narasipur"],"Mangalore":["Mangalore","Bantval","Belthangady","Puttur","Sullia"],"Hubli-Dharwad":["Hubli","Dharwad","Kundgol","Kalagatgi"],"Belagavi":["Belagavi","Gokak","Khanapur","Chikkodi","Ramdurg"],"Tumkur":["Tumkur","Tiptur","Gubbi","Sira","Madhugiri"],"Davangere":["Davangere","Harihara","Harihar","Jagalur","Channagiri"],"Shivamogga":["Shivamogga","Sagar","Hosanagara","Tirthahalli","Sorab"],"Udupi":["Udupi","Kundapura","Karkala"]},"Kerala":{"Thiruvananthapuram":["Thiruvananthapuram","Neyyattinkara","Nedumangad","Varkala","Attingal","Chirayinkeezhu"],"Kollam":["Kollam","Kunnathur","Kottarakkara","Pathanapuram","Punalur","Karunagappally"],"Pathanamthitta":["Pathanamthitta","Thiruvalla","Adoor","Konni","Kozhencherry","Ranni"],"Alappuzha":["Alappuzha","Cherthala","Kuttanad","Ambalappuzha","Mavelikkara","Chengannur"],"Kottayam":["Kottayam","Vaikom","Changanassery","Pala","Meenachil","Ettumanoor"],"Idukki":["Idukki","Thodupuzha","Udumbanchola","Devikulam","Peerumedu"],"Ernakulam":["Ernakulam","Aluva","Muvattupuzha","Kothamangalam","Kochi","Paravur","Kanayannur"],"Thrissur":["Thrissur","Chalakudy","Mukundapuram","Thalappilly","Kodungallur"],"Palakkad":["Palakkad","Ottapalam","Alathur","Mannarkkad","Chittur","Nemmara"],"Malappuram":["Malappuram","Tirur","Ponnani","Perinthalmanna","Nilambur","Kondotty"],"Kozhikode":["Kozhikode","Vatakara","Koyilandy","Thamarassery","Feroke","Balussery"],"Wayanad":["Mananthavady","Sulthanbathery","Vythiri","Kalpetta"],"Kannur":["Kannur","Thalassery","Iritty","Payyannur","Taliparamba","Koothuparamba"],"Kasaragod":["Kasaragod","Hosdurg","Velu","Manjeshwar","Kanhangad"]},"Madhya Pradesh":{"Bhopal":["Bhopal","Berasia","Phanda","Huzur"],"Indore":["Indore","Sanwer","Depalpur","Mhow"],"Gwalior":["Gwalior","Dabra","Bhitarwar","Pichhore"],"Jabalpur":["Jabalpur","Sihora","Katni","Patan"],"Raipur":["Raipur","Arang","Abhanpur"],"Ujjain":["Ujjain","Nagda","Khachrod","Mahidpur"],"Sagar":["Sagar","Rehli","Rahatgarh","Banda"],"Rewa":["Rewa","Mauganj","Teonthar","Gurh"],"Satna":["Satna","Raghurajnagar","Maihar","Nagod"],"Dewas":["Dewas","Kannod","Tonk Khurd","Bagli"]},"Maharashtra":{"Mumbai":["Andheri","Borivali","Kurla","Bandra","Malad","Kandivali","Dadar","Colaba","Chembur","Goregaon"],"Pune":["Pune City","Haveli","Mulshi","Maval","Bhor","Velhe","Junnar","Ambegaon"],"Nagpur":["Nagpur","Kamptee","Ramtek","Savner","Hingna","Katol"],"Nashik":["Nashik","Niphad","Sinnar","Igatpuri","Dindori","Peint"],"Aurangabad":["Aurangabad","Gangapur","Sillod","Kannad","Soegaon"],"Thane":["Thane","Kalyan","Bhiwandi","Murbad","Shahapur","Ambarnath"],"Kolhapur":["Kolhapur","Karvir","Panhala","Hatkanangale","Shirol"],"Solapur":["Solapur","Barshi","Akkalkot","Pandharpur","Malshiras"],"Amravati":["Amravati","Achalpur","Chandur Bazar","Morshi","Warud"],"Satara":["Satara","Karad","Patan","Khatav","Wai","Man"]},"Manipur":{"Imphal West":["Imphal","Patsoi","Lamphelpat","Naoriya Pakhanglakpa"],"Imphal East":["Porompat","Heingang","Jiribam","Andro"],"Thoubal":["Thoubal","Wangjing","Kakching","Yairipok"],"Bishnupur":["Bishnupur","Nambol","Moirang","Kumbi"]},"Meghalaya":{"East Khasi Hills":["Shillong","Cherrapunji","Mawsynram","Pynursla"],"West Khasi Hills":["Nongstoin","Mairang","Mawkyrwat"],"Ri Bhoi":["Nongpoh","Umsning","Umling"],"East Jaintia Hills":["Khliehriat","Lad Rymbai","Amlarem"],"West Garo Hills":["Tura","Ampati","Garobadha"],"East Garo Hills":["Williamnagar","Resubelpara"]},"Mizoram":{"Aizawl":["Aizawl","Durtlang","Tlangnuam","Thingsulthliah"],"Lunglei":["Lunglei","Hnahthial","Lawngtlai"],"Champhai":["Champhai","Khawzawl","Ngopa"],"Serchhip":["Serchhip","Thenzawl","E Lungdar"]},"Nagaland":{"Kohima":["Kohima","Viswema","Kigwema","Mima"],"Dimapur":["Dimapur","Niuland","Chumoukedima"],"Mokokchung":["Mokokchung","Mangkolemba","Longchem"],"Wokha":["Wokha","Bhandari","Sanis"]},"Odisha":{"Bhubaneswar":["Bhubaneswar","Jatani","Khordha","Banapur"],"Cuttack":["Cuttack","Salepur","Niali","Athagarh","Banki"],"Berhampur":["Berhampur","Chhatrapur","Kodala","Kabisuryanagar"],"Sambalpur":["Sambalpur","Rairakhol","Kuchinda","Bamra"],"Rourkela":["Rourkela","Sundargarh","Rajgangpur","Bonai"],"Balasore":["Balasore","Basta","Nilgiri","Soro"],"Puri":["Puri","Nimapara","Brahmagiri","Satyabadi","Pipili"],"Koraput":["Koraput","Jeypore","Kotpad","Boipariguda"],"Rayagada":["Rayagada","Gunupur","Kashipur","Padampur"]},"Punjab":{"Amritsar":["Amritsar","Ajnala","Baba Bakala","Majitha","Attari"],"Ludhiana":["Ludhiana","Samrala","Khanna","Payal","Raikot"],"Jalandhar":["Jalandhar","Nakodar","Lohian","Phillaur","Shahkot"],"Patiala":["Patiala","Rajpura","Samana","Nabha","Fatehgarh Sahib"],"Mohali":["Mohali","Dera Bassi","Kharar","Morinda"],"Bathinda":["Bathinda","Rampura Phul","Talwandi Sabo","Nathana"],"Hoshiarpur":["Hoshiarpur","Garhshankar","Mahilpur","Dasuya"],"Gurdaspur":["Gurdaspur","Batala","Pathankot","Dera Baba Nanak"],"Firozpur":["Firozpur","Zira","Fazilka","Guru Har Sahai"],"Kapurthala":["Kapurthala","Phagwara","Sultanpur Lodhi","Nadala"]},"Rajasthan":{"Jaipur":["Jaipur","Amber","Sanganer","Dudu","Phagi","Kotputli","Viratnagar"],"Jodhpur":["Jodhpur","Bilara","Luni","Phalodi","Osian","Bhopalgarh"],"Udaipur":["Udaipur","Girwa","Vallabhnagar","Mavli","Salumbar"],"Kota":["Kota","Ramganj Mandi","Sangod","Ladpura","Pipalda"],"Ajmer":["Ajmer","Beawar","Nasirabad","Pushkar","Kekri"],"Bikaner":["Bikaner","Nokha","Lunkaransar","Kolayat"],"Alwar":["Alwar","Behror","Kotkasim","Rajgarh","Kishangarhbas"],"Bharatpur":["Bharatpur","Deeg","Nagar","Kaman","Weir"],"Sikar":["Sikar","Neem Ka Thana","Fatehpur","Sri Madhopur","Laxmangarh"],"Nagaur":["Nagaur","Didwana","Makrana","Mundwa","Merta"]},"Sikkim":{"East Sikkim":["Gangtok","Pakyong","Rongli","Rakdong Tintek"],"West Sikkim":["Geyzing","Daramdin","Dentam","Soreng"],"North Sikkim":["Mangan","Chungthang","Dzongu"],"South Sikkim":["Namchi","Ravangla","Jorethang","Yangang"]},"Tamil Nadu":{"Chennai":["Chennai","Ambattur","Sholinganallur","Alandur","Tambaram","Avadi"],"Coimbatore":["Coimbatore","Pollachi","Mettupalayam","Valparai","Annur"],"Madurai":["Madurai","Melur","Usilampatti","Peraiyur","Thirumangalam"],"Tiruchirappalli":["Tiruchirappalli","Musiri","Srirangam","Lalgudi","Manachanallur"],"Salem":["Salem","Omalur","Attur","Mettur","Edapadi","Namakkal"],"Tirunelveli":["Tirunelveli","Palayamkottai","Nanguneri","Radhapuram","Tenkasi"],"Vellore":["Vellore","Gudiyatham","Anaicut","Katpadi","Arcot"],"Erode":["Erode","Bhavani","Perundurai","Gobichettipalayam","Sathyamangalam"],"Thanjavur":["Thanjavur","Papanasam","Orathanadu","Pattukkottai","Peravurani"],"Kanchipuram":["Kanchipuram","Uthiramerur","Walajabad","Sriperumbudur","Cheyyar"]},"Telangana":{"Hyderabad":["Hyderabad","Secunderabad","Musheerabad","Nampally","Charminar","Rajendranagar"],"Ranga Reddy":["Ranga Reddy","LB Nagar","Serilingampally","Chevella","Maheswaram","Shamshabad"],"Medchal-Malkajgiri":["Medchal","Malkajgiri","Quthbullapur","Alwal","Keesara"],"Warangal Urban":["Warangal","Kazipet","Hanamkonda","Narsampet"],"Karimnagar":["Karimnagar","Sircilla","Jagtial","Peddapalli","Manthani"],"Nizamabad":["Nizamabad","Bodhan","Armoor","Banswada","Yellareddy"],"Khammam":["Khammam","Kothagudem","Bhadrachalam","Yellandu","Palvancha"],"Mahbubnagar":["Mahbubnagar","Shadnagar","Nagarkurnool","Narayanpet","Wanaparthy"],"Nalgonda":["Nalgonda","Miryalaguda","Suryapet","Huzurnagar","Devarakonda"]},"Tripura":{"West Tripura":["Agartala","Jirania","Mohanpur","Bishalgarh","Majlishpur"],"South Tripura":["Belonia","Sabroom","Santirbazar","Udaipur"],"North Tripura":["Dharmanagar","Kailashahar","Panisagar"],"Gomati":["Udaipur","Amarpur","Silachari"]},"Uttar Pradesh":{"Lucknow":["Lucknow","Mohanlalganj","Malihabad","Bakshi Ka Talab","Sarojini Nagar"],"Agra":["Agra","Fatehabad","Bah","Etmadpur","Kheragarh","Achhnera"],"Varanasi":["Varanasi","Pindra","Arajiline","Harahua","Sewapuri"],"Kanpur Nagar":["Kanpur","Ghatampur","Bithur","Bidhunu","Kalyanpur"],"Allahabad":["Prayagraj","Handia","Meja","Soraon","Phulpur","Bara"],"Meerut":["Meerut","Hapur","Mawana","Sardhana","Kithore"],"Noida":["Noida","Dadri","Bisrakh","Jewar","Rabupura"],"Ghaziabad":["Ghaziabad","Loni","Muradnagar","Modi Nagar","Hapur"],"Mathura":["Mathura","Vrindavan","Govardhan","Baldeo","Mat"],"Gorakhpur":["Gorakhpur","Sahjanwa","Gola","Campierganj","Deoria"]},"Uttarakhand":{"Dehradun":["Dehradun","Vikasnagar","Chakrata","Tyuni","Kalsi"],"Haridwar":["Haridwar","Roorkee","Laksar","Bhagwanpur","Narsan"],"Nainital":["Nainital","Haldwani","Ramnagar","Bhimtal","Kaladhungi"],"Udham Singh Nagar":["Rudrapur","Khatima","Sitarganj","Kashipur","Bajpur"],"Almora":["Almora","Ranikhet","Dwarahat","Chaukhutia","Salt"],"Pauri Garhwal":["Pauri","Kotdwar","Srinagar","Lansdowne","Dhumakot"],"Tehri Garhwal":["Tehri","Narendra Nagar","Devprayag","Pratapnagar"],"Chamoli":["Gopeshwar","Joshimath","Karanprayag","Tharali"],"Pithoragarh":["Pithoragarh","Gangolihat","Didihat","Berinag"]},"West Bengal":{"Kolkata":["Kolkata","Tollygunge","Jadavpur","Behala","Dum Dum","Entally","Baguiati"],"North 24 Parganas":["Barasat","Barrackpore","Bongaon","Basirhat","Habra","Deganga"],"South 24 Parganas":["Alipore","Diamond Harbour","Kakdwip","Canning","Sonarpur"],"Howrah":["Howrah","Uluberia","Bally","Jagatdal","Amta","Udaynarayanpur"],"Hooghly":["Chandannagar","Serampore","Chinsurah","Arambag","Goghat"],"Burdwan":["Asansol","Durgapur","Bardhaman","Kalna","Katwa","Ausgram"],"Murshidabad":["Murshidabad","Berhampore","Domkal","Lalbag","Nawda"],"Nadia":["Krishnanagar","Ranaghat","Chakdaha","Kalyani","Santipur"],"Malda":["Malda","Gazole","Harishchandrapur","Ratua","Kaliachak"],"Jalpaiguri":["Jalpaiguri","Alipurduar","Dhupguri","Mal","Rajganj"]},"Jammu and Kashmir":{"Srinagar":["Srinagar","Pampore","Tral","Pulwama","Shopian"],"Jammu":["Jammu","Udhampur","Reasi","Kathua","Samba"],"Anantnag":["Anantnag","Kulgam","Pahalgam","Kokernag","Dooru"],"Baramulla":["Baramulla","Sopore","Tangmarg","Pattan","Uri"],"Kupwara":["Kupwara","Handwara","Lolab","Keran"],"Budgam":["Budgam","Khag","Beerwah","Chararchief","Chadoora"],"Leh":["Leh","Nubra","Nyoma","Changthang","Kharu"],"Kargil":["Kargil","Drass","Sankoo","Shakar Chiktan"]},"Ladakh":{"Leh":["Leh","Nubra","Zanskar","Durbuk","Nyoma"],"Kargil":["Kargil","Drass","Sankoo","Shakar Chiktan","Padum"]},"Puducherry":{"Puducherry":["Puducherry","Ariyankuppam","Mannadipet","Nettapakkam","Villianur"],"Karaikal":["Karaikal","Thirunallar","Kottucherry"],"Mahe":["Mahe"],"Yanam":["Yanam"]}};

const SEED = [
  { id:"ADV-001", name:"Adv. Priya Nair", email:"priya@nexusjustice.in", phone:"+91 9876500001", barCouncil:"KER/123/2018", plan:"Pro", status:"active", joined:"2025-11-10", lastLogin:"2026-03-04 09:12", state:"Kerala", district:"Ernakulam", subDistrict:"Aluva", location:"Kochi, Kerala", spec:"Civil Law" },
  { id:"ADV-002", name:"Adv. Rajesh Kumar", email:"rajesh@nexusjustice.in", phone:"+91 9876500002", barCouncil:"DEL/456/2015", plan:"Elite", status:"active", joined:"2025-10-05", lastLogin:"2026-03-03 18:45", state:"Delhi", district:"Central Delhi", subDistrict:"Connaught Place", location:"New Delhi", spec:"Criminal Law" },
  { id:"ADV-003", name:"Adv. Meera Pillai", email:"meera@nexusjustice.in", phone:"+91 9876500003", barCouncil:"KER/789/2020", plan:"Starter", status:"pending", joined:"2026-02-20", lastLogin:"—", state:"Kerala", district:"Thiruvananthapuram", subDistrict:"Thiruvananthapuram", location:"Trivandrum, Kerala", spec:"Family Law" },
  { id:"ADV-004", name:"Adv. Arun Menon", email:"arun@nexusjustice.in", phone:"+91 9876500004", barCouncil:"KER/321/2019", plan:"Pro", status:"suspended", joined:"2025-09-15", lastLogin:"2026-02-01 11:00", state:"Kerala", district:"Thrissur", subDistrict:"Thrissur", location:"Thrissur, Kerala", spec:"Property Law" },
  { id:"ADV-005", name:"Adv. Kavya Sharma", email:"kavya@nexusjustice.in", phone:"+91 9876500005", barCouncil:"MH/555/2021", plan:"Pro", status:"active", joined:"2026-01-10", lastLogin:"2026-03-01 16:22", state:"Maharashtra", district:"Mumbai", subDistrict:"Andheri", location:"Mumbai, Maharashtra", spec:"Corporate Law" },
  { id:"ADV-006", name:"Adv. Suresh Babu", email:"suresh@nexusjustice.in", phone:"+91 9876500006", barCouncil:"KER/900/2017", plan:"Elite", status:"active", joined:"2025-08-22", lastLogin:"2026-03-04 08:00", state:"Kerala", district:"Kozhikode", subDistrict:"Kozhikode", location:"Kozhikode, Kerala", spec:"Labour Law" },
];

// Commission: paid on 4th every month. Advocate subscription: due every 31st day from join date.
// Commission rate: 10% of each subscriber's plan fee per month.
const PLAN_FEE = { Starter:0, Pro:999, Elite:2499 };
const COMMISSION_RATE = 0.10;

const AFFILIATES = [
  {
    id:"AFF-001", name:"Sarah Jenkins", phone:"+91 9876541001", email:"sarah@lawpartner.in",
    code:"SJ-NEXUS-24", joined:"2025-12-01",
    state:"Kerala", district:"Ernakulam",
    subscribers:[
      { id:"S1", name:"Adv. Ravi Menon",    plan:"Pro",     joinDate:"2025-12-15", lastPayDate:"2026-02-13", paid:true  },
      { id:"S2", name:"Adv. Anitha Nair",   plan:"Elite",   joinDate:"2026-01-20", lastPayDate:"2026-02-19", paid:true  },
      { id:"S3", name:"Adv. Sujith Kumar",  plan:"Pro",     joinDate:"2026-02-01", lastPayDate:"2026-02-01", paid:false },
    ],
    paymentHistory:[
      { month:"Feb 2026", amount:349.80, paidOn:"2026-02-04", txId:"TXN-2402-001", status:"paid" },
      { month:"Jan 2026", amount:249.90, paidOn:"2026-01-04", txId:"TXN-2401-001", status:"paid" },
      { month:"Dec 2025", amount:99.90,  paidOn:"2025-12-04", txId:"TXN-2512-001", status:"paid" },
    ]
  },
  {
    id:"AFF-002", name:"Marcus Thorne", phone:"+91 9876541002", email:"marcus@legallink.in",
    code:"MT-LEGAL-99", joined:"2026-01-10",
    state:"Maharashtra", district:"Mumbai",
    subscribers:[
      { id:"S4", name:"Adv. Priya Sharma",  plan:"Elite",   joinDate:"2026-01-15", lastPayDate:"2026-02-14", paid:true  },
      { id:"S5", name:"Adv. Rohan Desai",   plan:"Pro",     joinDate:"2026-02-05", lastPayDate:"2026-02-05", paid:false },
    ],
    paymentHistory:[
      { month:"Feb 2026", amount:249.90, paidOn:"2026-02-04", txId:"TXN-2402-002", status:"paid" },
      { month:"Jan 2026", amount:249.90, paidOn:"2026-01-04", txId:"TXN-2401-002", status:"paid" },
    ]
  },
  {
    id:"AFF-003", name:"Elena Rodriguez", phone:"+91 9876541003", email:"elena@justicelink.in",
    code:"ER-LAW-55", joined:"2025-11-20",
    state:"Karnataka", district:"Bangalore Urban",
    subscribers:[
      { id:"S6", name:"Adv. Deepak Rao",    plan:"Pro",     joinDate:"2025-12-01", lastPayDate:"2026-02-28", paid:true  },
      { id:"S7", name:"Adv. Meena Pillai",  plan:"Starter", joinDate:"2026-01-05", lastPayDate:"2026-01-05", paid:false },
      { id:"S8", name:"Adv. Arjun Bhat",    plan:"Elite",   joinDate:"2025-11-25", lastPayDate:"2026-02-23", paid:true  },
      { id:"S9", name:"Adv. Nandini Shetty",plan:"Pro",     joinDate:"2026-02-10", lastPayDate:"2026-02-10", paid:false },
    ],
    paymentHistory:[
      { month:"Feb 2026", amount:449.70, paidOn:"2026-02-04", txId:"TXN-2402-003", status:"paid" },
      { month:"Jan 2026", amount:349.80, paidOn:"2026-01-04", txId:"TXN-2401-003", status:"paid" },
      { month:"Dec 2025", amount:249.90, paidOn:"2025-12-04", txId:"TXN-2512-003", status:"paid" },
      { month:"Nov 2025", amount:99.90,  paidOn:"2025-11-04", txId:"TXN-2511-003", status:"paid" },
    ]
  },
  {
    id:"AFF-004", name:"Anjali Verma", phone:"+91 9876541004", email:"anjali@legalpartner.in",
    code:"AV-LAW-77", joined:"2025-10-15",
    state:"Delhi", district:"South Delhi",
    subscribers:[
      { id:"S10", name:"Adv. Vikram Singh",  plan:"Elite",  joinDate:"2025-10-20", lastPayDate:"2026-02-17", paid:true  },
      { id:"S11", name:"Adv. Pooja Gupta",   plan:"Pro",    joinDate:"2025-11-10", lastPayDate:"2026-02-08", paid:true  },
      { id:"S12", name:"Adv. Amit Tiwari",   plan:"Pro",    joinDate:"2026-01-28", lastPayDate:"2026-01-28", paid:false },
      { id:"S13", name:"Adv. Sunita Yadav",  plan:"Starter",joinDate:"2026-02-14", lastPayDate:"2026-02-14", paid:false },
    ],
    paymentHistory:[
      { month:"Feb 2026", amount:499.80, paidOn:"2026-02-04", txId:"TXN-2402-004", status:"paid" },
      { month:"Jan 2026", amount:349.80, paidOn:"2026-01-04", txId:"TXN-2401-004", status:"paid" },
      { month:"Dec 2025", amount:349.80, paidOn:"2025-12-04", txId:"TXN-2512-004", status:"paid" },
      { month:"Nov 2025", amount:249.90, paidOn:"2025-11-04", txId:"TXN-2511-004", status:"paid" },
    ]
  },
];

const MSGS_INIT = [
  { id:1, from:"Adv. Priya Nair", advId:"ADV-001", role:"advocate", text:"Hello Admin, I have a billing question about my Pro plan renewal.", time:"09:15" },
  { id:2, from:"Admin", advId:"ADV-001", role:"admin", text:"Sure! Your plan renews on April 1st. I can send you the invoice now if needed.", time:"09:18" },
  { id:3, from:"Adv. Rajesh Kumar", advId:"ADV-002", role:"advocate", text:"Can I get API access added to my Elite plan?", time:"10:30" },
];

export default function AgencyHQ({ onBack }) {
  const [tab, setTab] = useState("dashboard");
  const [registry, setRegistry] = useState(SEED);
  const tabBarRef = useRef(null);

  // Non-passive wheel listener: vertical scroll moves tab bar left/right.
  // Scrollbar moving RIGHT → tabs shift LEFT (natural: scrollLeft increases, content moves left).
  // Drag LEFT on tab bar → reveals tabs on the right.
  useEffect(() => {
    const el = tabBarRef.current;
    if (!el) return;
    // Vertical wheel → horizontal scroll (scroll down = move left = reveal right tabs)
    const onWheel = (e) => {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    // Drag to scroll: drag LEFT → scrollLeft increases → tabs shift left (reveals right side)
    let isDown = false, startX = 0, scrollStart = 0;
    const onMouseDown = (e) => { isDown = true; startX = e.pageX; scrollStart = el.scrollLeft; el.style.cursor = "grabbing"; };
    const onMouseUp   = ()    => { isDown = false; el.style.cursor = "grab"; };
    const onMouseMove = (e)   => {
      if (!isDown) return;
      // dragging left (e.pageX decreases) → scrollLeft increases → tabs move left
      el.scrollLeft = scrollStart + (startX - e.pageX);
    };
    el.addEventListener("wheel",      onWheel,      { passive: false });
    el.addEventListener("mousedown",  onMouseDown);
    window.addEventListener("mouseup",   onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      el.removeEventListener("wheel",      onWheel);
      el.removeEventListener("mousedown",  onMouseDown);
      window.removeEventListener("mouseup",   onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  // Location data - embedded directly
  const locationData = INDIA;
  const locationLoading = false;

  // Location filter dropdowns
  const [filterState, setFilterState]         = useState("");
  const [filterDistrict, setFilterDistrict]   = useState("");
  const [filterSubDist, setFilterSubDist]     = useState("");

  // Other filters
  const [search, setSearch]           = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPlan, setFilterPlan]   = useState("all");

  // Messages
  const [msgs, setMsgs]               = useState(MSGS_INIT);
  const [msgInput, setMsgInput]       = useState("");
  const [selectedAdv, setSelectedAdv] = useState("ADV-001");

  // Broadcasts
  const [broadcast, setBroadcast]     = useState("");
  const [bTarget, setBTarget]         = useState("all");
  const [bSent, setBSent]             = useState(false);

  // Smart broadcast state
  const [bMode, setBMode]             = useState("general");      // general | paid | default
  const [bLog,  setBLog]              = useState([
    { id:1, type:"paid",    target:"Paid Subscribers",    msg:"Your payment of ₹999 received on 2026-02-04. Thank you and congratulations!", time:"2026-02-04 10:05", count:8,  channel:"WhatsApp" },
    { id:2, type:"default", target:"Defaulted Members",   msg:"Your payment is due from 2026-01-31. Please make payment as soon as possible for uninterrupted services.", time:"2026-02-05 09:00", count:3,  channel:"WhatsApp" },
    { id:3, type:"general", target:"All Advocates",       msg:"Welcome to Nexus Justice v3.1! Check out the new Writing Desk feature.", time:"2026-03-04 09:00", count:6,  channel:"In-App" },
    { id:4, type:"general", target:"Affiliates Only",     msg:"New affiliate commission rates effective April 1st.", time:"2026-02-28 11:00", count:4,  channel:"Email" },
  ]);
  const [bChannel, setBChannel]       = useState("WhatsApp");
  const [bPreview,  setBPreview]      = useState(null);
  const [bChecked,  setBChecked]      = useState({});
  const [bSending,  setBSending]      = useState(false);
  const [bDone,     setBDone]         = useState(null);

  // Affiliate page state
  const [affFilterState, setAffFilterState]   = useState("");
  const [affFilterDist,  setAffFilterDist]    = useState("");
  const [selectedAff,    setSelectedAff]      = useState("AFF-001"); // side-pane selected affiliate
  const [subFilter,      setSubFilter]        = useState("all");     // all | paid | overdue | pending | elite | pro | starter
  const [subSearch,      setSubSearch]        = useState("");

  // ── PAYMENTS STATE ──────────────────────────────────────────────────────
  const TODAY_STR = "2026-03-05";
  const TODAY_D = new Date(TODAY_STR);

  const [payAccount, setPayAccount] = useState({
    bankName:"", accountName:"", accountNumber:"", ifsc:"", upiId:"", razorpayLink:"",
  });
  const [payAccountSaved, setPayAccountSaved] = useState(false);
  const [payTab, setPayTab] = useState("notifications"); // notifications | account
  const [paySearchQ, setPaySearchQ] = useState("");
  const [payFilter, setPayFilter] = useState("all"); // all | overdue | due-soon | no-commission | has-commission

  const computeAdvNotif = (adv) => {
    const fee = PLAN_FEE[adv.plan] || 0;
    if (fee === 0) return null;
    const joinDate = new Date(adv.joined);
    const msPerDay = 86400000;
    const daysSince = Math.floor((TODAY_D - joinDate) / msPerDay);
    if (daysSince < 0) return null;
    const cycleNum  = Math.floor(daysSince / 31);
    const dueDate   = new Date(joinDate.getTime() + (cycleNum + 1) * 31 * msPerDay);
    const dueDateStr = dueDate.toISOString().slice(0,10);
    const daysUntilDue = Math.floor((dueDate - TODAY_D) / msPerDay);
    const isFirstPayment = cycleNum === 0;
    // Find if advocate appears as a subscriber in any affiliate (for commission credit)
    let commissionCredited = 0;
    for (const aff of AFFILIATES) {
      const sub = aff.subscribers.find(s => s.id === adv.id || s.name === adv.name);
      if (sub && sub.paid && !isOverdue(sub.lastPayDate)) {
        commissionCredited = (PLAN_FEE[sub.plan] || 0) * COMMISSION_RATE;
        break;
      }
    }
    const netPayable = Math.max(0, fee - commissionCredited);
    return { advId:adv.id, advName:adv.name, plan:adv.plan, fee, commissionCredited, netPayable, dueDate:dueDateStr, daysUntilDue, isFirstPayment, isOverduePayment: daysUntilDue < 0 };
  };

  const allPayNotifs = registry
    .filter(a => a.status !== "suspended")
    .map(computeAdvNotif)
    .filter(Boolean)
    .sort((a,b) => a.daysUntilDue - b.daysUntilDue);

  const savePayAccount = () => {
    setPayAccountSaved(false);
    setTimeout(() => setPayAccountSaved(true), 900);
    setTimeout(() => setPayAccountSaved(false), 3500);
  };

  // Connectivity page state
  const [conn, setConn] = useState({
    // Telephony
    telProvider:"",        telApiKey:"",       telApiSecret:"",    telVirtualNum:"",   telConnected:false,
    // WhatsApp
    waNumber:"",           waToken:"",         waWebhookUrl:"",    waConnected:false,
    // Razorpay
    rzpKeyId:"",           rzpKeySecret:"",    rzpWebhookSecret:"",rzpConnected:false,
    // App Webhooks
    appWebhookUrl:"",      appWebhookSecret:"",appWebhookConnected:false,
    // Virtual Number (app-assigned)
    virtualNum:"",         virtualNumNote:"",
  });
  const [connSaved,   setConnSaved]   = useState({});   // which sections were saved
  const [connTest,    setConnTest]    = useState({});    // which sections are being tested
  const [showSecret,  setShowSecret]  = useState({});   // toggle visibility of secret fields

  const saveSection = (section) => {
    setConnSaved(s=>({...s,[section]:true}));
    setTimeout(()=>setConnSaved(s=>({...s,[section]:false})),2500);
  };
  const testSection = (section) => {
    setConnTest(s=>({...s,[section]:true}));
    setTimeout(()=>{
      setConnTest(s=>({...s,[section]:false}));
      setConn(c=>({...c,[section+"Connected"]:true}));
    },1800);
  };
  const toggleSecret = (key) => setShowSecret(s=>({...s,[key]:!s[key]}));
  const setC = (key,val) => setConn(c=>({...c,[key]:val}));

  // System Prompts tab state
  const ADVOCATE_DEFAULT = `You are LEXI, the dedicated AI Legal Agent for Nexus Justice — an intelligent assistant embedded inside the advocate's personal portal.

## YOUR IDENTITY
- Name: LEXI (Legal Expert & Client eXperience Intelligence)
- Role: Senior AI Legal Agent for the advocate
- Tone: Professional, precise, empathetic — like a highly experienced legal clerk who also understands human emotion
- Language: Respond in the same language the advocate uses (English, Malayalam, Hindi, etc.)

## YOUR PRIMARY DUTIES

### 1. CASE INTELLIGENCE
- Analyse case facts provided by the advocate and suggest applicable IPC sections, CPC provisions, or relevant statutes
- Summarise judgments, identify precedents, and explain legal positions in plain language
- Flag procedural deadlines, limitation periods, and critical dates

### 2. DOCUMENT DRAFTING
- Draft court-ready documents: Plaints, Written Statements, Bail Applications, Writ Petitions, Legal Notices, Affidavits, Power of Attorney, Appeals, Vakalatnamas
- Follow formal Indian court document structure and conventions
- Always include appropriate prayer clauses, verification, and cause title
- When revising a draft, preserve original intent unless explicitly told to change it

### 3. CALL HANDLING (Temp Instructions Mode)
- When the advocate sets Temp Instructions, you act as their phone agent
- Follow the instructions EXACTLY — do not improvise or override them
- Greet callers professionally: "Good [morning/afternoon/evening], this is the office of [Advocate Name]. How may I assist you?"
- If a caller matches a specific instruction (by name or topic), apply that instruction precisely
- Take accurate messages: caller name, contact number, purpose, time of call
- Never disclose sensitive case information to callers unless explicitly authorised
- If unsure, say: "I will have [Advocate Name] return your call shortly."

### 4. CLIENT COMMUNICATION
- Help draft professional client emails, WhatsApp messages, and hearing notices
- Translate complex legal language into client-friendly explanations
- Prepare hearing summaries for clients after court dates

### 5. RESEARCH
- Provide accurate citations from Indian law: IPC, CrPC, CPC, Constitution, specific Acts
- Cross-reference High Court and Supreme Court judgments when relevant
- Always mention if a legal position is disputed or subject to interpretation

## RULES YOU MUST FOLLOW
1. NEVER give advice that contradicts established Indian law
2. ALWAYS caveat opinions as "legal guidance" not "legal advice" — final decisions rest with the advocate
3. NEVER fabricate case citations or judgments — if unsure, say so clearly
4. Maintain absolute confidentiality of all client and case information
5. If asked about anything outside legal practice (personal matters, finance, medical), politely redirect
6. Always refer to the advocate respectfully as "Sir", "Ma'am", or by their preferred title

## RESPONSE FORMAT
- Use structured responses with clear headings for complex queries
- For draft documents: use formal legal formatting
- For quick questions: concise direct answers
- Always end document drafts with: "[DRAFT — Review before filing]"`;

  const AFFILIATE_DEFAULT = `You are the Nexus Justice Affiliate Intelligence System — an AI engine that manages, tracks, and communicates everything related to the Affiliate Partner Programme.

## PROGRAMME RULES (NON-NEGOTIABLE — DO NOT OVERRIDE)

### Commission Structure
- Commission Rate: **20% of the first month's subscription payment only**
- This is a ONE-TIME commission per referred subscriber — NOT recurring
- No commission is earned on renewals, upgrades, or subsequent payments from the same subscriber
- Commission is calculated on the **actual amount paid** by the subscriber (after any discounts)

### Payment Schedule
- All affiliate commissions are disbursed on the **4th of every calendar month**
- Example: If a subscriber signs up and pays on March 15 → affiliate earns 20% of that payment → commission is paid on **April 4**
- If the 4th falls on a bank holiday, payment moves to the next working day

### Subscriber Payment Cycle
- Each subscriber's renewal is due every **31 days from their original joining date** (not calendar month)
- Example: Joined February 10 → Next payment due: March 13 → Next: April 13, and so on
- A subscriber is considered **Active** if their last payment was within 31 days
- A subscriber is **Overdue** if 31+ days have passed since their last payment
- A subscriber is **Pending** if they have never completed their first payment

### Commission Eligibility
- Commission is ONLY earned when the subscriber's FIRST payment clears successfully
- If a referred subscriber never pays (stays Pending), NO commission is earned
- If a payment is refunded, the corresponding commission is clawed back in the next payout cycle

## YOUR DUTIES

### 1. COMMISSION TRACKING & REPORTING
- Calculate exact commission amounts for each affiliate: (First Payment Amount × 20%)
- Generate monthly commission statements showing: subscriber name, join date, first payment date, payment amount, commission earned, payout date
- Flag any subscribers who are overdue so affiliates can follow up
- Clearly distinguish between: commission earned (paid), commission pending (awaiting payout on 4th), and not eligible (subscriber never paid)

### 2. AFFILIATE ONBOARDING GUIDANCE
- Explain the programme rules clearly to new affiliates
- Generate unique referral codes for tracking
- Provide affiliates with a personalised referral link template

### 3. SUBSCRIBER STATUS QUERIES
- Answer questions like: "Which of my subscribers are overdue?", "When do I get paid?", "How much will I earn next month?"
- Calculate projected payout for the upcoming 4th based on subscribers who joined and paid in the current cycle
- Show the list of subscribers NOT yet counted in the next payout (overdue/pending)

### 4. PAYMENT DISPUTE HANDLING
- If an affiliate disputes a commission calculation, show full working:
  Subscriber: [Name] | Joined: [Date] | First Payment: ₹[Amount] on [Date] | Commission: ₹[Amount] (20%) | Payout: [4th of next month]
- Never adjust commission amounts without agency admin approval

### 5. PERFORMANCE INSIGHTS
- Show affiliate leaderboards by subscriber count and earnings
- Identify top-performing affiliates for recognition
- Flag inactive affiliates (no new referrals in 60+ days)

## COMMUNICATION TONE
- With affiliates: warm, motivating, transparent — like a partner success manager
- With agency admin: precise, data-driven, compliance-focused
- Always be clear about what IS and IS NOT a commission event

## RULES YOU MUST FOLLOW
1. Never promise commissions that don't match the programme rules above
2. Always show calculation breakdown when quoting commission amounts
3. If a rule conflicts with what an affiliate claims, politely explain the correct policy and offer to escalate to admin
4. Never share one affiliate's subscriber data with another affiliate
5. All payout dates are fixed at the 4th — no exceptions unless admin overrides`;

  const [advocatePrompt, setAdvocatePrompt] = useState(ADVOCATE_DEFAULT);
  const [affiliatePrompt, setAffiliatePrompt] = useState(AFFILIATE_DEFAULT);
  const [promptSaved, setPromptSaved] = useState({ advocate:false, affiliate:false });
  const [promptSection, setPromptSection] = useState("advocate"); // advocate | affiliate
  const [promptCopied, setPromptCopied] = useState({ advocate:false, affiliate:false });

  const savePrompt = (which) => {
    setPromptSaved(s=>({...s,[which]:true}));
    setTimeout(()=>setPromptSaved(s=>({...s,[which]:false})),2500);
  };
  const copyPrompt = (which) => {
    const text = which==="advocate" ? advocatePrompt : affiliatePrompt;
    navigator.clipboard && navigator.clipboard.writeText(text);
    setPromptCopied(s=>({...s,[which]:true}));
    setTimeout(()=>setPromptCopied(s=>({...s,[which]:false})),2000);
  };
  const resetPrompt = (which) => {
    if(which==="advocate") setAdvocatePrompt(ADVOCATE_DEFAULT);
    else setAffiliatePrompt(AFFILIATE_DEFAULT);
  };

  // Add advocate modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAdv, setNewAdv]           = useState({ name:"", email:"", phone:"", barCouncil:"", plan:"Pro", state:"", district:"", subDistrict:"", spec:"Civil Law" });
  const [addState, setAddState]       = useState("");
  const [addDistrict, setAddDistrict] = useState("");
  const [addSubDist, setAddSubDist]   = useState("");



  const states       = Object.keys(locationData).sort();
  const districts    = filterState ? Object.keys(locationData[filterState] || {}).sort() : [];
  const subDistricts = filterState && filterDistrict ? Object.keys(locationData[filterState][filterDistrict] || {}).sort() : [];

  const addDistricts   = addState ? Object.keys(locationData[addState] || {}).sort() : [];
  const addSubDistricts = addState && addDistrict ? Object.keys(locationData[addState][addDistrict] || {}).sort() : [];

  const C = { bg:"#020617", card:"#0a0f1d", border:"rgba(255,255,255,.06)", gold:"#f59e0b", accent:"#6366f1", text:"#e2e8f0", muted:"#475569" };
  const card  = { background:C.card, borderRadius:20, padding:24, border:"1px solid "+C.border };
  const inp   = { background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.1)", borderRadius:10, padding:"9px 14px", color:C.text, fontSize:12, width:"100%", outline:"none", boxSizing:"border-box" };
  const sInp  = { ...inp, width:"auto", cursor:"pointer", minWidth:150, appearance:"auto" };
  const btn   = (bg="#f59e0b", sm) => ({ padding:sm?"6px 14px":"10px 22px", background:bg, border:"none", borderRadius:9, color:bg==="rgba(255,255,255,.07)"||bg==="rgba(255,255,255,.05)"?"#94a3b8":"#fff", fontSize:sm?10:11, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap" });

  const statusColor = s => s==="active"?"#10b981":s==="pending"?"#f59e0b":s==="suspended"?"#ef4444":"#64748b";
  const planColor   = p => p==="Elite"?"#f59e0b":p==="Pro"?"#818cf8":"#64748b";
  const planBg      = p => p==="Elite"?"rgba(245,158,11,.12)":p==="Pro"?"rgba(99,102,241,.12)":"rgba(100,116,139,.1)";

  const filtered = registry.filter(a => {
    const q = search.toLowerCase();
    const matchSearch  = !q || a.name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q) || a.id.toLowerCase().includes(q);
    const matchStatus  = filterStatus==="all" || a.status===filterStatus;
    const matchPlan    = filterPlan==="all" || a.plan===filterPlan;
    const matchState   = !filterState || a.state===filterState;
    const matchDist    = !filterDistrict || a.district===filterDistrict;
    const matchSub     = !filterSubDist || a.subDistrict===filterSubDist;
    return matchSearch && matchStatus && matchPlan && matchState && matchDist && matchSub;
  });

  const threadMsgs = msgs.filter(m => m.advId===selectedAdv);
  const threadAdv  = registry.find(a => a.id===selectedAdv);

  const sendMsg = () => {
    if (!msgInput.trim()) return;
    setMsgs(m => [...m, { id:Date.now(), from:"Admin", advId:selectedAdv, role:"admin", text:msgInput.trim(), time:new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"}) }]);
    setMsgInput("");
  };

  const saveNewAdv = () => {
    if (!newAdv.name || !newAdv.email) return;
    const id = "ADV-" + String(registry.length+1).padStart(3,"0");
    setRegistry(r => [...r, { ...newAdv, id, status:"pending", joined:new Date().toISOString().slice(0,10), lastLogin:"—", location:(addSubDist||addDistrict||addState), state:addState, district:addDistrict, subDistrict:addSubDist }]);
    setShowAddModal(false);
    setNewAdv({ name:"", email:"", phone:"", barCouncil:"", plan:"Pro", state:"", district:"", subDistrict:"", spec:"Civil Law" });
    setAddState(""); setAddDistrict(""); setAddSubDist("");
  };

  const clearLocationFilters = () => { setFilterState(""); setFilterDistrict(""); setFilterSubDist(""); };

  // ── KNOWLEDGE BASE STATE (Global only — advocate KB lives in advocate portal) ──
  const KB_CATEGORIES = ["Constitution & Fundamental Rights","IPC / Criminal Law","CPC / Civil Procedure","Evidence Act","Family Law","Property Law","Labour & Employment","Corporate & Company Law","Export / Import Law","Cooperative Law","Intellectual Property","Cyber Law","Taxation","Environmental Law","Consumer Protection","Land Acquisition","Banking & Finance","Insurance Law","Arbitration","Other"];

  const [globalDocs, setGlobalDocs] = useState([
    { id:"GD001", name:"The Indian Penal Code 1860.pdf",         category:"IPC / Criminal Law",               size:"2.4 MB", uploadedOn:"2026-02-10", type:"pdf",  access:"all",       desc:"Complete IPC with all amendments up to 2023" },
    { id:"GD002", name:"Code of Civil Procedure 1908.pdf",        category:"CPC / Civil Procedure",            size:"1.8 MB", uploadedOn:"2026-02-10", type:"pdf",  access:"all",       desc:"CPC with Order rules and amendments" },
    { id:"GD003", name:"Standard Bail Application Template.docx", category:"IPC / Criminal Law",               size:"84 KB",  uploadedOn:"2026-02-15", type:"docx", access:"all",       desc:"Ready-to-use bail application with prayer clause" },
    { id:"GD004", name:"Constitution of India (Full).pdf",        category:"Constitution & Fundamental Rights",size:"3.1 MB", uploadedOn:"2026-02-20", type:"pdf",  access:"all",       desc:"All articles and schedules" },
    { id:"GD005", name:"Vakalatnama Draft Model.docx",            category:"CPC / Civil Procedure",            size:"42 KB",  uploadedOn:"2026-03-01", type:"docx", access:"pro-elite", desc:"Model vakalatnama for High Court and District Court" },
    { id:"GD006", name:"Indian Evidence Act 1872.pdf",            category:"Evidence Act",                     size:"1.1 MB", uploadedOn:"2026-03-02", type:"pdf",  access:"all",       desc:"Full Evidence Act with case law annotations" },
    { id:"GD007", name:"Legal Notice Model Template.docx",        category:"Other",                            size:"38 KB",  uploadedOn:"2026-03-03", type:"docx", access:"all",       desc:"Standard legal notice format for all matter types" },
  ]);

  const [kbSearchQ,    setKbSearchQ]    = useState("");
  const [kbCatFilter,  setKbCatFilter]  = useState("all");
  const [kbTypeFilter, setKbTypeFilter] = useState("all");
  const [kbAccFilter,  setKbAccFilter]  = useState("all");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm,   setUploadForm]   = useState({ name:"", category:KB_CATEGORIES[0], desc:"", access:"all", size:"", type:"pdf" });
  const [uploadDoing,  setUploadDoing]  = useState(false);
  const [uploadDone,   setUploadDone]   = useState(false);
  const [deleteConfirm,setDeleteConfirm]= useState(null);

  const doUpload = () => {
    if (!uploadForm.name) return;
    setUploadDoing(true);
    setTimeout(() => {
      const newDoc = {
        id: "GD" + String(Date.now()).slice(-5),
        name: uploadForm.name.includes(".") ? uploadForm.name : uploadForm.name + "." + uploadForm.type,
        category: uploadForm.category,
        size: uploadForm.size || "—",
        uploadedOn: TODAY_STR,
        type: uploadForm.type,
        access: uploadForm.access,
        desc: uploadForm.desc,
      };
      setGlobalDocs(d => [newDoc, ...d]);
      setUploadDoing(false);
      setUploadDone(true);
      setTimeout(() => {
        setUploadDone(false);
        setShowUploadModal(false);
        setUploadForm({ name:"", category:KB_CATEGORIES[0], desc:"", access:"all", size:"", type:"pdf" });
      }, 1200);
    }, 900);
  };

  const tabs = [
    { id:"dashboard",    label:"Dashboard",    icon:"📊" },
    { id:"advocates",    label:"Advocates",    icon:"👥" },
    { id:"messages",     label:"Messages",     icon:"💬" },
    { id:"affiliates",   label:"Affiliates",   icon:"🔗" },
    { id:"broadcasts",   label:"Broadcasts",   icon:"📢" },
    { id:"payments",     label:"Payments",     icon:"💰" },
    { id:"knowledge",    label:"Knowledge Base",icon:"📚" },
    { id:"connectivity", label:"Connectivity", icon:"🔌" },
    { id:"prompts",      label:"AI Prompts",   icon:"🧠" },
  ];

  const LocationSelect = ({ label, value, onChange, options, disabled, placeholder }) => (
    <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
      <div style={{ fontSize:9, fontWeight:700, color:"#64748b", textTransform:"uppercase", letterSpacing:"0.1em" }}>{label}</div>
      <select value={value} onChange={e => onChange(e.target.value)} disabled={disabled || options.length===0} style={{ ...sInp, opacity:disabled||options.length===0?0.45:1, minWidth:150 }}>
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  // ── AFFILIATE HELPERS ──────────────────────────────────────────────────
  const affDistricts  = affFilterState ? Object.keys(locationData[affFilterState] || {}).sort() : [];

  const filteredAffs = AFFILIATES.filter(a => {
    const ms = !affFilterState || a.state === affFilterState;
    const md = !affFilterDist  || a.district === affFilterDist;
    return ms && md;
  });

  const getNextPayDate = (lastPayDate) => {
    if (!lastPayDate) return "—";
    const d = new Date(lastPayDate);
    d.setDate(d.getDate() + 31);
    return d.toISOString().slice(0,10);
  };

  const isOverdue = (lastPayDate) => {
    if (!lastPayDate) return false;
    const next = new Date(lastPayDate);
    next.setDate(next.getDate() + 31);
    return next < new Date("2026-03-04");
  };

  const calcNextCommission = (aff) => {
    return aff.subscribers
      .filter(s => s.paid)
      .reduce((sum, s) => sum + (PLAN_FEE[s.plan] || 0) * COMMISSION_RATE, 0);
  };

  const unpaidSubs = (aff) => aff.subscribers.filter(s => !s.paid || isOverdue(s.lastPayDate));

  const totalEarned = (aff) => aff.paymentHistory.reduce((s, p) => s + p.amount, 0);

  const downloadCSV = (aff) => {
    const rows = [
      ["Month","Amount (INR)","Paid On","Transaction ID","Status"],
      ...aff.paymentHistory.map(p => [p.month, p.amount.toFixed(2), p.paidOn, p.txId, p.status])
    ];
    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type:"text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = "commission_"+aff.code+".csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100vh", background:C.bg, color:C.text, fontFamily:"system-ui,sans-serif", fontSize:13, overflow:"hidden" }}>
      <style>{`
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-thumb{background:rgba(245,158,11,.3);border-radius:4px}
        input,select,textarea{color:#e2e8f0!important} input::placeholder,textarea::placeholder{color:#475569!important}
        button{transition:opacity .15s,background .15s} button:hover{opacity:.85}
        select option{background:#0a0f1d;color:#e2e8f0}
        @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        .fade{animation:fadeIn .25s ease}
        .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;z-index:100}
        .tabbar-scroll { scrollbar-width: thin; scrollbar-color: rgba(245,158,11,0.4) rgba(255,255,255,0.02); }
        .tabbar-scroll::-webkit-scrollbar { height: 6px; }
        .tabbar-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        .tabbar-scroll::-webkit-scrollbar-thumb { background: rgba(245,158,11,0.4); border-radius: 3px; }
        .tabbar-scroll::-webkit-scrollbar-thumb:hover { background: rgba(245,158,11,0.6); }
      `}</style>

      {/* HEADER */}
      <div style={{ background:"#070b14", borderBottom:"1px solid rgba(255,255,255,.06)", padding:"0 28px", display:"flex", alignItems:"center", justifyContent:"space-between", height:60, flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ width:38, height:38, background:C.gold, borderRadius:11, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 20px rgba(245,158,11,.35)" }}>
            <span style={{ fontSize:20, fontWeight:900, color:"#000", fontStyle:"italic" }}>N</span>
          </div>
          <div>
            <div style={{ fontWeight:900, fontSize:15, letterSpacing:"-0.02em" }}>Agency <span style={{ color:C.gold }}>HQ</span></div>
            <div style={{ fontSize:9, color:C.muted, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase" }}>Master Command Interface</div>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:10, color:"#10b981", fontWeight:700 }}>📍 {states.length} States</span>
            <div style={{ width:8, height:8, borderRadius:"50%", background:"#10b981", boxShadow:"0 0 8px #10b981" }} />
            <span style={{ fontSize:10, fontWeight:700, color:"#10b981", letterSpacing:"0.15em", textTransform:"uppercase" }}>Live</span>
          </div>
          {onBack && (
            <button 
              onClick={onBack} 
              style={{
                background: "rgba(255, 99, 99, 0.15)",
                color: "#ff8484",
                border: "1px solid rgba(255, 99, 99, 0.3)",
                borderRadius: "8px",
                padding: "6px 14px",
                fontSize: "10px",
                fontWeight: "900",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                cursor: "pointer"
              }}
            >
              ← Exit to Hub
            </button>
          )}
        </div>
      </div>

      {/* TAB BAR — scroll right → tabs move left revealing hidden items */}
      <div style={{ background:"#070b14", borderBottom:"1px solid rgba(255,255,255,.06)", display:"flex", alignItems:"stretch", flexShrink:0, position:"relative" }}>
        {/* Left arrow */}
        <button onClick={()=>{ tabBarRef.current.scrollLeft -= 160; }}
          style={{ padding:"0 10px", background:"none", border:"none", borderRight:"1px solid rgba(255,255,255,.06)", color:"#475569", fontSize:14, cursor:"pointer", flexShrink:0, lineHeight:1 }}>‹</button>
        {/* Scrollable tab strip */}
        <div
          ref={tabBarRef}
          className="tabbar-scroll"
          style={{ display:"flex", gap:0, overflowX:"auto", flex:1, cursor:"grab", userSelect:"none" }}
        >
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ padding:"12px 16px", background:"none", border:"none",
                borderBottom:tab===t.id?"2px solid "+C.gold:"2px solid transparent",
                color:tab===t.id?C.gold:C.muted, fontSize:10, fontWeight:700, cursor:"pointer",
                letterSpacing:"0.12em", textTransform:"uppercase", display:"flex", alignItems:"center",
                gap:6, whiteSpace:"nowrap", flexShrink:0 }}>
              {t.icon} {t.label}
              {t.id==="advocates" && registry.filter(a=>a.status==="pending").length > 0 && (
                <span style={{ background:"#ef4444", color:"#fff", fontSize:8, fontWeight:900, padding:"1px 5px", borderRadius:10 }}>{registry.filter(a=>a.status==="pending").length}</span>
              )}
            </button>
          ))}
        </div>
        {/* Right arrow */}
        <button onClick={()=>{ tabBarRef.current.scrollLeft += 160; }}
          style={{ padding:"0 10px", background:"none", border:"none", borderLeft:"1px solid rgba(255,255,255,.06)", color:"#475569", fontSize:14, cursor:"pointer", flexShrink:0, lineHeight:1 }}>›</button>
      </div>

      {/* CONTENT */}
      <div style={{ flex:1, overflowY:"auto", padding:24 }} className="fade">

        {/* ── DASHBOARD ── */}
        {tab==="dashboard" && (
          <div>
            <div style={{ marginBottom:24 }}>
              <div style={{ fontSize:9, fontWeight:900, color:C.gold, letterSpacing:"0.3em", textTransform:"uppercase", marginBottom:4 }}>Overview</div>
              <h2 style={{ fontSize:40, fontWeight:900, fontStyle:"italic", letterSpacing:"-0.04em" }}>Dashboard</h2>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:14, marginBottom:24 }}>
              {[
                { label:"Total Advocates", val:registry.length,                                      color:"#6366f1", icon:"⚖️" },
                { label:"Active",          val:registry.filter(a=>a.status==="active").length,        color:"#10b981", icon:"✅" },
                { label:"Pending",         val:registry.filter(a=>a.status==="pending").length,       color:"#f59e0b", icon:"⏳" },
                { label:"Affiliates",      val:AFFILIATES.length,                                     color:"#fb923c", icon:"🔗" },
                { label:"Aff. Subscribers", val:AFFILIATES.reduce((s,a)=>s+a.subscribers.length,0), color:"#a78bfa", icon:"👤" },
              ].map(s => (
                <div key={s.label} style={{ ...card, padding:"20px 22px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                    <span style={{ fontSize:22 }}>{s.icon}</span>
                    <div style={{ width:8, height:8, borderRadius:"50%", background:s.color, boxShadow:"0 0 8px "+s.color }} />
                  </div>
                  <div style={{ fontSize:40, fontWeight:900, color:s.color, lineHeight:1, marginBottom:6 }}>{s.val}</div>
                  <div style={{ fontSize:9, color:C.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.15em" }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:20 }}>
              {/* Plan breakdown */}
              <div style={card}>
                <div style={{ fontSize:9, fontWeight:900, color:C.muted, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:16 }}>Plan Breakdown</div>
                {["Elite","Pro","Starter"].map(plan => {
                  const count = registry.filter(a=>a.plan===plan).length;
                  const pct   = registry.length ? Math.round(count/registry.length*100) : 0;
                  return (
                    <div key={plan} style={{ marginBottom:14 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                        <span style={{ fontSize:12, fontWeight:700, color:planColor(plan) }}>{plan}</span>
                        <span style={{ fontSize:11, color:C.muted }}>{count}</span>
                      </div>
                      <div style={{ height:6, background:"rgba(255,255,255,.05)", borderRadius:3 }}>
                        <div style={{ height:"100%", width:pct+"%", background:planColor(plan), borderRadius:3 }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* State distribution */}
              <div style={card}>
                <div style={{ fontSize:9, fontWeight:900, color:C.muted, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:16 }}>By State</div>
                {[...new Set(registry.map(a=>a.state))].sort().map(st => {
                  const count = registry.filter(a=>a.state===st).length;
                  return (
                    <div key={st} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"6px 0", borderBottom:"1px solid rgba(255,255,255,.04)" }}>
                      <span style={{ fontSize:12, color:C.text }}>{st}</span>
                      <span style={{ fontSize:11, fontWeight:700, color:C.gold, background:"rgba(245,158,11,.1)", padding:"2px 8px", borderRadius:6 }}>{count}</span>
                    </div>
                  );
                })}
              </div>

              {/* Recent signups */}
              <div style={card}>
                <div style={{ fontSize:9, fontWeight:900, color:C.muted, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:16 }}>Recent Signups</div>
                {registry.slice(-4).reverse().map(a => (
                  <div key={a.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:"1px solid rgba(255,255,255,.04)" }}>
                    <div>
                      <div style={{ fontSize:12, fontWeight:700 }}>{a.name}</div>
                      <div style={{ fontSize:10, color:C.muted }}>{a.state} · {a.spec}</div>
                    </div>
                    <span style={{ padding:"2px 8px", borderRadius:6, fontSize:9, fontWeight:900, background:planBg(a.plan), color:planColor(a.plan) }}>{a.plan}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── ADVOCATES ── */}
        {tab==="advocates" && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:16 }}>
              <div>
                <div style={{ fontSize:9, fontWeight:900, color:C.gold, letterSpacing:"0.3em", textTransform:"uppercase", marginBottom:4 }}>Registry</div>
                <h2 style={{ fontSize:32, fontWeight:900, fontStyle:"italic", letterSpacing:"-0.03em" }}>Advocates</h2>
              </div>
              <button onClick={()=>setShowAddModal(true)} style={btn()}>+ Add Advocate</button>
            </div>

            {/* ── FILTER BAR ── */}
            <div style={{ ...card, marginBottom:16, padding:"18px 20px" }}>
              <div style={{ display:"flex", alignItems:"flex-end", gap:12, flexWrap:"wrap" }}>
                {/* Text search */}
                <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                  <div style={{ fontSize:9, fontWeight:700, color:"#64748b", textTransform:"uppercase", letterSpacing:"0.1em" }}>Search</div>
                  <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Name, email, ID…" style={{ ...inp, width:190 }} />
                </div>

                {/* Status */}
                <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                  <div style={{ fontSize:9, fontWeight:700, color:"#64748b", textTransform:"uppercase", letterSpacing:"0.1em" }}>Status</div>
                  <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} style={sInp}>
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>

                {/* Plan */}
                <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                  <div style={{ fontSize:9, fontWeight:700, color:"#64748b", textTransform:"uppercase", letterSpacing:"0.1em" }}>Plan</div>
                  <select value={filterPlan} onChange={e=>setFilterPlan(e.target.value)} style={sInp}>
                    <option value="all">All Plans</option>
                    <option value="Elite">Elite</option>
                    <option value="Pro">Pro</option>
                    <option value="Starter">Starter</option>
                  </select>
                </div>

                {/* Divider */}
                <div style={{ width:1, height:44, background:"rgba(255,255,255,.08)", alignSelf:"flex-end" }} />

                {/* 📍 LOCATION DROPDOWNS */}
                <div style={{ display:"flex", alignItems:"center", gap:6, alignSelf:"flex-end", marginBottom:2 }}>
                  <span style={{ fontSize:11 }}>📍</span>
                  <span style={{ fontSize:9, fontWeight:900, color:C.gold, letterSpacing:"0.15em", textTransform:"uppercase" }}>Location</span>
                </div>

                <LocationSelect
                  label="State"
                  value={filterState}
                  onChange={v => { setFilterState(v); setFilterDistrict(""); setFilterSubDist(""); }}
                  options={states}
                  placeholder="All States"
                />
                <LocationSelect
                  label="District"
                  value={filterDistrict}
                  onChange={v => { setFilterDistrict(v); setFilterSubDist(""); }}
                  options={districts}
                  disabled={!filterState}
                  placeholder={filterState ? "All Districts" : "Select State first"}
                />
                <LocationSelect
                  label="Sub District"
                  value={filterSubDist}
                  onChange={setFilterSubDist}
                  options={subDistricts}
                  disabled={!filterDistrict}
                  placeholder={filterDistrict ? "All Sub Districts" : "Select District first"}
                />

                {/* Clear location */}
                {(filterState || filterDistrict || filterSubDist) && (
                  <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                    <div style={{ fontSize:9, color:"transparent" }}>x</div>
                    <button onClick={clearLocationFilters} style={{ ...btn("rgba(239,68,68,.12)",true), color:"#ef4444" }}>✕ Clear</button>
                  </div>
                )}
              </div>

              {/* Active filter pills */}
              {(filterState || filterDistrict || filterSubDist) && (
                <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginTop:12, paddingTop:12, borderTop:"1px solid rgba(255,255,255,.05)" }}>
                  {filterState && <span style={{ padding:"3px 10px", background:"rgba(245,158,11,.12)", border:"1px solid rgba(245,158,11,.25)", borderRadius:20, fontSize:10, color:C.gold, fontWeight:700 }}>📍 {filterState}</span>}
                  {filterDistrict && <span style={{ padding:"3px 10px", background:"rgba(99,102,241,.12)", border:"1px solid rgba(99,102,241,.25)", borderRadius:20, fontSize:10, color:"#818cf8", fontWeight:700 }}>🏛 {filterDistrict}</span>}
                  {filterSubDist && <span style={{ padding:"3px 10px", background:"rgba(16,185,129,.1)", border:"1px solid rgba(16,185,129,.2)", borderRadius:20, fontSize:10, color:"#10b981", fontWeight:700 }}>📌 {filterSubDist}</span>}
                  <span style={{ padding:"3px 10px", background:"rgba(255,255,255,.05)", borderRadius:20, fontSize:10, color:C.muted }}>{filtered.length} result{filtered.length!==1?"s":""}</span>
                </div>
              )}
            </div>

            {/* TABLE */}
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", background:C.card, borderRadius:16, overflow:"hidden" }}>
                <thead>
                  <tr style={{ borderBottom:"1px solid rgba(255,255,255,.06)" }}>
                    {["ID","Name","Email","Phone","Bar Council","State","District","Sub District","Specialization","Plan","Status","Joined","Last Login","Actions"].map(h => (
                      <th key={h} style={{ padding:"11px 14px", textAlign:"left", fontSize:9, fontWeight:900, color:C.muted, textTransform:"uppercase", letterSpacing:"0.1em", whiteSpace:"nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((a, i) => (
                    <tr key={a.id} style={{ borderBottom:"1px solid rgba(255,255,255,.03)", background:i%2===0?"transparent":"rgba(255,255,255,.01)" }}>
                      <td style={{ padding:"12px 14px", fontSize:10, color:C.muted, fontFamily:"monospace" }}>{a.id}</td>
                      <td style={{ padding:"12px 14px", fontWeight:700, whiteSpace:"nowrap" }}>{a.name}</td>
                      <td style={{ padding:"12px 14px", fontSize:11, color:C.muted }}>{a.email}</td>
                      <td style={{ padding:"12px 14px", fontSize:11, color:C.muted, whiteSpace:"nowrap" }}>{a.phone}</td>
                      <td style={{ padding:"12px 14px", fontSize:10, fontFamily:"monospace", color:C.muted }}>{a.barCouncil}</td>
                      <td style={{ padding:"12px 14px" }}><span style={{ padding:"2px 8px", background:"rgba(245,158,11,.1)", borderRadius:6, fontSize:9, color:C.gold, fontWeight:700, whiteSpace:"nowrap" }}>{a.state}</span></td>
                      <td style={{ padding:"12px 14px", fontSize:11, color:C.muted, whiteSpace:"nowrap" }}>{a.district}</td>
                      <td style={{ padding:"12px 14px", fontSize:11, color:C.muted, whiteSpace:"nowrap" }}>{a.subDistrict}</td>
                      <td style={{ padding:"12px 14px" }}><span style={{ padding:"2px 8px", background:"rgba(99,102,241,.1)", borderRadius:6, fontSize:9, color:"#818cf8", fontWeight:700, whiteSpace:"nowrap" }}>{a.spec}</span></td>
                      <td style={{ padding:"12px 14px" }}><span style={{ padding:"3px 9px", borderRadius:6, fontSize:9, fontWeight:900, background:planBg(a.plan), color:planColor(a.plan) }}>{a.plan}</span></td>
                      <td style={{ padding:"12px 14px" }}><span style={{ padding:"3px 9px", borderRadius:6, fontSize:9, fontWeight:900, background:a.status==="active"?"rgba(16,185,129,.12)":a.status==="pending"?"rgba(245,158,11,.12)":"rgba(239,68,68,.1)", color:statusColor(a.status) }}>{a.status}</span></td>
                      <td style={{ padding:"12px 14px", fontSize:10, color:C.muted, whiteSpace:"nowrap" }}>{a.joined}</td>
                      <td style={{ padding:"12px 14px", fontSize:10, color:C.muted, whiteSpace:"nowrap" }}>{a.lastLogin}</td>
                      <td style={{ padding:"12px 14px" }}>
                        <div style={{ display:"flex", gap:5 }}>
                          {a.status==="pending"    && <button onClick={()=>setRegistry(r=>r.map(x=>x.id===a.id?{...x,status:"active"}:x))}    style={btn("#10b981",true)}>✓ Approve</button>}
                          {a.status==="active"     && <button onClick={()=>setRegistry(r=>r.map(x=>x.id===a.id?{...x,status:"suspended"}:x))} style={{ ...btn("rgba(239,68,68,.12)",true), color:"#ef4444" }}>Suspend</button>}
                          {a.status==="suspended"  && <button onClick={()=>setRegistry(r=>r.map(x=>x.id===a.id?{...x,status:"active"}:x))}    style={{ ...btn("rgba(16,185,129,.12)",true), color:"#10b981" }}>Restore</button>}
                          <button onClick={()=>{ setSelectedAdv(a.id); setTab("messages"); }} style={btn("rgba(255,255,255,.07)",true)}>💬</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length===0 && (
                <div style={{ textAlign:"center", padding:48, color:C.muted }}>
                  <div style={{ fontSize:32, marginBottom:8 }}>🔍</div>
                  No advocates match your filters.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── MESSAGES ── */}
        {tab==="messages" && (
          <div style={{ display:"flex", gap:20, height:"calc(100vh - 145px)" }}>
            <div style={{ width:240, flexShrink:0, display:"flex", flexDirection:"column", gap:8, overflowY:"auto" }}>
              <div style={{ fontSize:9, fontWeight:900, color:C.muted, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:8 }}>Threads</div>
              {registry.map(a => (
                <button key={a.id} onClick={()=>setSelectedAdv(a.id)} style={{ ...card, textAlign:"left", padding:"12px 14px", cursor:"pointer", borderColor:selectedAdv===a.id?"rgba(245,158,11,.35)":C.border, background:selectedAdv===a.id?"rgba(245,158,11,.05)":C.card }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ width:28, height:28, borderRadius:"50%", background:"linear-gradient(135deg,#6366f1,#a78bfa)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:900, flexShrink:0 }}>{a.name.split(" ").map(w=>w[0]).join("").slice(0,2)}</div>
                    <div><div style={{ fontWeight:700, fontSize:12 }}>{a.name}</div><div style={{ fontSize:9, color:C.muted }}>{a.state}</div></div>
                  </div>
                </button>
              ))}
            </div>
            <div style={{ flex:1, display:"flex", flexDirection:"column", ...card, padding:0, overflow:"hidden" }}>
              <div style={{ padding:"14px 20px", borderBottom:"1px solid rgba(255,255,255,.06)", display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:32, height:32, borderRadius:"50%", background:"linear-gradient(135deg,#6366f1,#a78bfa)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:900 }}>{threadAdv && threadAdv.name.split(" ").map(w=>w[0]).join("").slice(0,2)}</div>
                <div>
                  <div style={{ fontWeight:700 }}>{threadAdv && threadAdv.name}</div>
                  <div style={{ fontSize:10, color:C.muted }}>{threadAdv && threadAdv.state} · {threadAdv && threadAdv.district} · {threadAdv && threadAdv.plan}</div>
                </div>
              </div>
              <div style={{ flex:1, overflowY:"auto", padding:"16px 20px", display:"flex", flexDirection:"column", gap:10 }}>
                {threadMsgs.length===0 && <div style={{ textAlign:"center", color:C.muted, marginTop:40 }}>No messages yet.</div>}
                {threadMsgs.map(m => (
                  <div key={m.id} style={{ display:"flex", flexDirection:"column", alignItems:m.role==="admin"?"flex-end":"flex-start", gap:3 }}>
                    <div style={{ maxWidth:"75%", padding:"10px 14px", borderRadius:14, background:m.role==="admin"?"rgba(245,158,11,.15)":"rgba(255,255,255,.06)", fontSize:12, lineHeight:1.6 }}>{m.text}</div>
                    <div style={{ fontSize:9, color:"#334155", fontWeight:700 }}>{m.role==="admin"?"Admin":m.from} · {m.time}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding:"12px 20px", borderTop:"1px solid rgba(255,255,255,.06)", display:"flex", gap:8 }}>
                <input value={msgInput} onChange={e=>setMsgInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMsg()} placeholder="Type a message…" style={{ ...inp, flex:1 }} />
                <button onClick={sendMsg} style={btn(C.gold)}>Send</button>
              </div>
            </div>
          </div>
        )}

        {/* ── AFFILIATES ── side-pane layout ── */}
        {tab==="affiliates" && (()=>{
          const aff          = AFFILIATES.find(a=>a.id===selectedAff) || AFFILIATES[0];
          const nextComm     = calcNextCommission(aff);
          const unpaidList   = unpaidSubs(aff);
          const earned       = totalEarned(aff);
          const paidSubs     = aff.subscribers.filter(s=>s.paid && !isOverdue(s.lastPayDate));

          // Apply subscriber filters to the selected affiliate's subscribers
          const visibleSubs  = aff.subscribers.filter(s=>{
            const over = isOverdue(s.lastPayDate);
            const q    = subSearch.toLowerCase();
            const matchSearch = !q || s.name.toLowerCase().includes(q);
            let   matchFilter = true;
            if(subFilter==="paid")    matchFilter = s.paid && !over;
            if(subFilter==="overdue") matchFilter = over;
            if(subFilter==="pending") matchFilter = !s.paid && !over;
            if(subFilter==="elite")   matchFilter = s.plan==="Elite";
            if(subFilter==="pro")     matchFilter = s.plan==="Pro";
            if(subFilter==="starter") matchFilter = s.plan==="Starter";
            return matchSearch && matchFilter;
          });

          return (
            <div style={{ display:"flex", gap:0, height:"calc(100vh - 145px)", overflow:"hidden" }}>

              {/* ── LEFT SIDE PANE: Affiliate list ── */}
              <div style={{ width:260, flexShrink:0, display:"flex", flexDirection:"column", borderRight:"1px solid rgba(255,255,255,.06)", overflow:"hidden" }}>
                {/* Pane header */}
                <div style={{ padding:"16px 16px 10px", borderBottom:"1px solid rgba(255,255,255,.06)", flexShrink:0 }}>
                  <div style={{ fontSize:9, fontWeight:900, color:"#fb923c", letterSpacing:"0.25em", textTransform:"uppercase", marginBottom:6 }}>Partner Network</div>

                  {/* Location filters stacked */}
                  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                    <select value={affFilterState} onChange={e=>{ setAffFilterState(e.target.value); setAffFilterDist(""); }}
                      style={{ ...inp, fontSize:11, padding:"6px 10px", cursor:"pointer" }}>
                      <option value="">📍 All States</option>
                      {Object.keys(locationData).sort().map(s=><option key={s} value={s}>{s}</option>)}
                    </select>
                    <select value={affFilterDist} onChange={e=>setAffFilterDist(e.target.value)}
                      disabled={!affFilterState}
                      style={{ ...inp, fontSize:11, padding:"6px 10px", cursor:"pointer", opacity:!affFilterState?0.4:1 }}>
                      <option value="">{affFilterState?"🏛 All Districts":"Select state first"}</option>
                      {affDistricts.map(d=><option key={d} value={d}>{d}</option>)}
                    </select>
                    {(affFilterState||affFilterDist)&&(
                      <button onClick={()=>{setAffFilterState("");setAffFilterDist("");}}
                        style={{...btn("rgba(239,68,68,.1)",true),color:"#ef4444",width:"100%",textAlign:"center"}}>
                        ✕ Clear filter
                      </button>
                    )}
                  </div>
                </div>

                {/* Affiliate list */}
                <div style={{ flex:1, overflowY:"auto", padding:"8px 0" }}>
                  {filteredAffs.length===0&&(
                    <div style={{ padding:20, textAlign:"center", color:C.muted, fontSize:11 }}>No matches</div>
                  )}
                  {filteredAffs.map(a=>{
                    const isSelected = a.id===selectedAff;
                    const unc = unpaidSubs(a).length;
                    const nc  = calcNextCommission(a);
                    return (
                      <button key={a.id} onClick={()=>{setSelectedAff(a.id);setSubFilter("all");setSubSearch("");}}
                        style={{ width:"100%", textAlign:"left", padding:"12px 16px", background:isSelected?"rgba(251,146,60,.08)":"transparent",
                          borderLeft:isSelected?"3px solid #fb923c":"3px solid transparent",
                          border:"none", borderLeft:isSelected?"3px solid #fb923c":"3px solid transparent",
                          cursor:"pointer", display:"block" }}>
                        {/* Avatar + name row */}
                        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                          <div style={{ width:32, height:32, borderRadius:"50%", flexShrink:0,
                            background:isSelected?"linear-gradient(135deg,#fb923c,#f59e0b)":"linear-gradient(135deg,#334155,#475569)",
                            display:"flex", alignItems:"center", justifyContent:"center",
                            fontSize:12, fontWeight:900, color:"#fff" }}>
                            {a.name.split(" ").map(w=>w[0]).join("").slice(0,2)}
                          </div>
                          <div style={{ flex:1, minWidth:0 }}>
                            <div style={{ fontWeight:700, fontSize:13, color:isSelected?"#fb923c":C.text,
                              whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{a.name}</div>
                            <div style={{ fontSize:9, color:C.muted, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                              {a.district}, {a.state}
                            </div>
                          </div>
                        </div>
                        {/* Mini stats */}
                        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                          <span style={{ fontSize:9, background:"rgba(99,102,241,.12)", color:"#818cf8", padding:"1px 7px", borderRadius:10, fontWeight:700 }}>
                            {a.subscribers.length} subs
                          </span>
                          {unc>0&&(
                            <span style={{ fontSize:9, background:"rgba(239,68,68,.12)", color:"#ef4444", padding:"1px 7px", borderRadius:10, fontWeight:700 }}>
                              {unc} overdue
                            </span>
                          )}
                          <span style={{ fontSize:9, background:"rgba(16,185,129,.1)", color:"#10b981", padding:"1px 7px", borderRadius:10, fontWeight:700 }}>
                            ₹{nc.toFixed(0)} next
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Pane footer summary */}
                <div style={{ padding:"10px 14px", borderTop:"1px solid rgba(255,255,255,.06)", flexShrink:0, background:"#070b14" }}>
                  {[
                    ["Affiliates", filteredAffs.length, "#fb923c"],
                    ["Total Subs", filteredAffs.reduce((s,a)=>s+a.subscribers.length,0), "#6366f1"],
                  ].map(([l,v,c])=>(
                    <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"3px 0", fontSize:10 }}>
                      <span style={{ color:C.muted }}>{l}</span>
                      <span style={{ fontWeight:900, color:c }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── RIGHT MAIN PANE: Selected affiliate detail ── */}
              <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>

                {/* Affiliate header bar */}
                <div style={{ padding:"14px 20px", borderBottom:"1px solid rgba(255,255,255,.06)", flexShrink:0, background:"#070b14", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ width:40, height:40, borderRadius:"50%", background:"linear-gradient(135deg,#fb923c,#f59e0b)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, fontWeight:900, color:"#fff", flexShrink:0 }}>
                      {aff.name.split(" ").map(w=>w[0]).join("").slice(0,2)}
                    </div>
                    <div>
                      <div style={{ fontWeight:900, fontSize:18, letterSpacing:"-0.02em" }}>{aff.name}</div>
                      <div style={{ fontSize:10, color:C.muted, display:"flex", gap:10 }}>
                        <span>{aff.email}</span>
                        <span>·</span>
                        <span>{aff.phone}</span>
                        <span>·</span>
                        <span style={{ color:"#fb923c", fontFamily:"monospace" }}>{aff.code}</span>
                        <span>·</span>
                        <span>📍 {aff.district}, {aff.state}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                    <div style={{ textAlign:"right", fontSize:10, color:C.muted, marginRight:4 }}>
                      <div>Joined {aff.joined}</div>
                      <div style={{ color:"#10b981", fontWeight:700 }}>Next commission Apr 4 → ₹{nextComm.toFixed(2)}</div>
                    </div>
                    <button onClick={()=>downloadCSV(aff)} style={{ ...btn("rgba(16,185,129,.2)",true), color:"#10b981" }}>⬇ CSV</button>
                  </div>
                </div>

                {/* KPI strip */}
                <div style={{ display:"flex", gap:0, borderBottom:"1px solid rgba(255,255,255,.06)", flexShrink:0 }}>
                  {[
                    { label:"Total",        val:aff.subscribers.length,            color:"#6366f1",  bg:"rgba(99,102,241,.06)"  },
                    { label:"Paid",         val:paidSubs.length,                   color:"#10b981",  bg:"rgba(16,185,129,.06)"  },
                    { label:"Overdue",      val:unpaidList.filter(s=>isOverdue(s.lastPayDate)).length, color:"#ef4444", bg:"rgba(239,68,68,.06)" },
                    { label:"Pending",      val:aff.subscribers.filter(s=>!s.paid&&!isOverdue(s.lastPayDate)).length, color:"#f59e0b", bg:"rgba(245,158,11,.06)" },
                    { label:"Elite",        val:aff.subscribers.filter(s=>s.plan==="Elite").length,   color:"#f59e0b",  bg:"rgba(245,158,11,.04)" },
                    { label:"Pro",          val:aff.subscribers.filter(s=>s.plan==="Pro").length,     color:"#818cf8",  bg:"rgba(99,102,241,.04)" },
                    { label:"Starter",      val:aff.subscribers.filter(s=>s.plan==="Starter").length, color:"#64748b",  bg:"rgba(255,255,255,.02)" },
                    { label:"Total Earned", val:"₹"+earned.toFixed(0),             color:C.gold,     bg:"rgba(245,158,11,.05)" },
                  ].map(k=>(
                    <div key={k.label} style={{ flex:1, padding:"10px 12px", background:k.bg, textAlign:"center", borderRight:"1px solid rgba(255,255,255,.04)" }}>
                      <div style={{ fontSize:18, fontWeight:900, color:k.color, lineHeight:1 }}>{k.val}</div>
                      <div style={{ fontSize:8, color:C.muted, textTransform:"uppercase", letterSpacing:"0.1em", marginTop:3 }}>{k.label}</div>
                    </div>
                  ))}
                </div>

                {/* Filter + search bar */}
                <div style={{ padding:"10px 16px", borderBottom:"1px solid rgba(255,255,255,.06)", flexShrink:0, display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                  <input value={subSearch} onChange={e=>setSubSearch(e.target.value)}
                    placeholder="Search subscriber name…"
                    style={{ ...inp, width:200, fontSize:11, padding:"6px 12px" }} />
                  <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                    {[
                      ["all","All","#64748b"],
                      ["paid","✓ Paid","#10b981"],
                      ["overdue","⚠ Overdue","#ef4444"],
                      ["pending","⏳ Pending","#f59e0b"],
                      ["elite","Elite","#f59e0b"],
                      ["pro","Pro","#818cf8"],
                      ["starter","Starter","#64748b"],
                    ].map(([v,l,c])=>(
                      <button key={v} onClick={()=>setSubFilter(v)}
                        style={{ padding:"5px 12px", borderRadius:8,
                          background:subFilter===v?"rgba(251,146,60,.15)":"rgba(255,255,255,.04)",
                          border:"1px solid "+(subFilter===v?"rgba(251,146,60,.4)":"rgba(255,255,255,.07)"),
                          color:subFilter===v?"#fb923c":C.muted,
                          fontSize:10, fontWeight:700, cursor:"pointer" }}>
                        {l}
                      </button>
                    ))}
                  </div>
                  <span style={{ marginLeft:"auto", fontSize:10, color:C.muted }}>
                    {visibleSubs.length} of {aff.subscribers.length} subscribers
                  </span>
                </div>

                {/* Subscriber table */}
                <div style={{ flex:1, overflowY:"auto" }}>
                  {visibleSubs.length===0 ? (
                    <div style={{ textAlign:"center", padding:48, color:C.muted }}>
                      <div style={{ fontSize:32, marginBottom:8 }}>🔍</div>
                      No subscribers match this filter.
                    </div>
                  ) : (
                    <table style={{ width:"100%", borderCollapse:"collapse" }}>
                      <thead style={{ position:"sticky", top:0, zIndex:2 }}>
                        <tr style={{ background:"#0a0f1d", borderBottom:"1px solid rgba(255,255,255,.08)" }}>
                          {["#","Subscriber Name","Plan","Joined","Last Payment","Next Due (31d)","Commission","Status"].map(h=>(
                            <th key={h} style={{ padding:"10px 14px", textAlign:"left", fontSize:9, fontWeight:900, color:C.muted, textTransform:"uppercase", letterSpacing:"0.1em", whiteSpace:"nowrap" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {visibleSubs.map((s,i)=>{
                          const over       = isOverdue(s.lastPayDate);
                          const nextDue    = getNextPayDate(s.lastPayDate);
                          const commission = ((PLAN_FEE[s.plan]||0)*COMMISSION_RATE).toFixed(2);
                          const statusLabel = over?"Overdue":s.paid?"Paid":"Pending";
                          const sColor     = over?"#ef4444":s.paid?"#10b981":"#f59e0b";
                          const sBg        = over?"rgba(239,68,68,.1)":s.paid?"rgba(16,185,129,.1)":"rgba(245,158,11,.1)";
                          const rowBg      = over?"rgba(239,68,68,.03)":i%2===0?"transparent":"rgba(255,255,255,.01)";
                          return (
                            <tr key={s.id} style={{ borderBottom:"1px solid rgba(255,255,255,.03)", background:rowBg }}>
                              <td style={{ padding:"12px 14px", fontSize:10, color:C.muted }}>{i+1}</td>
                              <td style={{ padding:"12px 14px" }}>
                                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                                  <div style={{ width:28, height:28, borderRadius:"50%",
                                    background:"linear-gradient(135deg,#334155,#475569)",
                                    display:"flex", alignItems:"center", justifyContent:"center",
                                    fontSize:10, fontWeight:900, flexShrink:0 }}>
                                    {s.name.split(" ").filter(w=>w[0]).map(w=>w[0]).join("").slice(0,2)}
                                  </div>
                                  <span style={{ fontWeight:700, fontSize:13 }}>{s.name}</span>
                                </div>
                              </td>
                              <td style={{ padding:"12px 14px" }}>
                                <span style={{ padding:"3px 9px", borderRadius:6, fontSize:9, fontWeight:900,
                                  background:s.plan==="Elite"?"rgba(245,158,11,.12)":s.plan==="Pro"?"rgba(99,102,241,.12)":"rgba(100,116,139,.1)",
                                  color:s.plan==="Elite"?"#f59e0b":s.plan==="Pro"?"#818cf8":"#64748b" }}>
                                  {s.plan}
                                </span>
                              </td>
                              <td style={{ padding:"12px 14px", fontSize:11, color:C.muted, whiteSpace:"nowrap" }}>{s.joinDate}</td>
                              <td style={{ padding:"12px 14px", fontSize:11, color:C.muted, whiteSpace:"nowrap" }}>{s.lastPayDate||"—"}</td>
                              <td style={{ padding:"12px 14px", whiteSpace:"nowrap" }}>
                                <span style={{ fontSize:11, color:over?"#ef4444":C.muted, fontWeight:over?700:400 }}>{nextDue}</span>
                                {over&&<span style={{ marginLeft:5, fontSize:9, background:"rgba(239,68,68,.12)", color:"#ef4444", padding:"1px 6px", borderRadius:4, fontWeight:700 }}>OVERDUE</span>}
                              </td>
                              <td style={{ padding:"12px 14px" }}>
                                <span style={{ fontWeight:700, color: s.paid&&!over?"#10b981":"#475569", fontSize:13 }}>
                                  {s.paid&&!over ? "₹"+commission : "—"}
                                </span>
                                {s.paid&&!over&&<div style={{ fontSize:8, color:"#334155" }}>Apr 4 payout</div>}
                              </td>
                              <td style={{ padding:"12px 14px" }}>
                                <span style={{ padding:"3px 10px", borderRadius:6, fontSize:9, fontWeight:900, background:sBg, color:sColor }}>
                                  {statusLabel}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>

                {/* Footer: commission summary for current filter */}
                <div style={{ padding:"10px 16px", borderTop:"1px solid rgba(255,255,255,.06)", flexShrink:0, background:"#070b14", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div style={{ fontSize:10, color:C.muted }}>
                    {unpaidList.length>0
                      ? <span style={{ color:"#ef4444" }}>⚠ {unpaidList.length} subscriber{unpaidList.length!==1?"s":""} overdue/unpaid — not counted in next commission</span>
                      : <span style={{ color:"#10b981" }}>✓ All subscribers up to date</span>
                    }
                  </div>
                  <div style={{ display:"flex", gap:16, alignItems:"center" }}>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:9, color:C.muted, textTransform:"uppercase", letterSpacing:"0.1em" }}>Next Commission (Apr 4)</div>
                      <div style={{ fontSize:18, fontWeight:900, color:"#10b981" }}>₹{nextComm.toFixed(2)}</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:9, color:C.muted, textTransform:"uppercase", letterSpacing:"0.1em" }}>Total Earned</div>
                      <div style={{ fontSize:18, fontWeight:900, color:C.gold }}>₹{earned.toFixed(2)}</div>
                    </div>
                    <button onClick={()=>downloadCSV(aff)} style={{ ...btn("rgba(16,185,129,.2)",true), color:"#10b981" }}>⬇ CSV</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ── BROADCASTS ── */}
        {/* ── BROADCASTS ── */}
        {tab==="broadcasts" && (
          <div style={{ display:"flex", flexDirection:"column", height:"calc(100vh - 145px)", overflow:"hidden" }}>

            <div style={{ flexShrink:0, marginBottom:20 }}>
              <div style={{ fontSize:9, fontWeight:900, color:"#a78bfa", letterSpacing:"0.3em", textTransform:"uppercase", marginBottom:4 }}>Communications</div>
              <h2 style={{ fontSize:36, fontWeight:900, fontStyle:"italic", letterSpacing:"-0.04em" }}>Broadcasts</h2>
            </div>

            <div style={{ flex:1, display:"flex", gap:20, overflow:"hidden" }}>

              {/* LEFT: compose panel */}
              <div style={{ width:340, flexShrink:0, display:"flex", flexDirection:"column", gap:14, overflowY:"auto" }}>

                {/* Mode selector */}
                <div style={{ ...card, padding:"16px" }}>
                  <div style={{ fontSize:9, fontWeight:900, color:C.muted, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:12 }}>Broadcast Type</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                    {[
                      { id:"paid",    icon:"✅", label:"Paid Subscribers",  sub:"Payment received confirmation",  color:"#10b981", count:AFFILIATES.flatMap(a=>a.subscribers.filter(s=>s.paid&&!isOverdue(s.lastPayDate))).length },
                      { id:"default", icon:"⚠️", label:"Defaulted Members", sub:"Payment due reminder",           color:"#ef4444", count:AFFILIATES.flatMap(a=>a.subscribers.filter(s=>!s.paid||isOverdue(s.lastPayDate))).length },
                      { id:"general", icon:"📢", label:"General Broadcast", sub:"Custom message to any audience", color:"#a78bfa", count:null },
                    ].map(m=>(
                      <button key={m.id} onClick={()=>{ setBMode(m.id); setBDone(null); setBChecked({}); setBPreview(null); }}
                        style={{ textAlign:"left", padding:"12px 14px", background:bMode===m.id?"rgba(255,255,255,.07)":"rgba(255,255,255,.03)", border:"none", borderRadius:12, cursor:"pointer",
                          borderLeft:bMode===m.id?"3px solid "+m.color:"3px solid transparent", outline:"none" }}>
                        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:3 }}>
                          <span style={{ display:"flex", alignItems:"center", gap:7, fontWeight:900, fontSize:12, color:bMode===m.id?m.color:C.text }}>
                            <span style={{ fontSize:16 }}>{m.icon}</span>{m.label}
                          </span>
                          {m.count!==null && <span style={{ fontSize:11, fontWeight:900, color:m.color, background:"rgba(255,255,255,.06)", padding:"1px 8px", borderRadius:10 }}>{m.count}</span>}
                        </div>
                        <div style={{ fontSize:10, color:C.muted, paddingLeft:23 }}>{m.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Channel */}
                <div style={{ ...card, padding:"16px" }}>
                  <div style={{ fontSize:9, fontWeight:900, color:C.muted, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:10 }}>Send Via</div>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                    {[["WhatsApp","💬","#25d366"],["SMS","📱","#6366f1"],["Email","📧","#3395ff"],["In-App","🔔","#f59e0b"]].map(([ch,icon,color])=>(
                      <button key={ch} onClick={()=>setBChannel(ch)}
                        style={{ padding:"7px 14px", borderRadius:9, background:bChannel===ch?"rgba(255,255,255,.08)":"rgba(255,255,255,.04)",
                          border:"1px solid "+(bChannel===ch?color+"66":"rgba(255,255,255,.07)"),
                          color:bChannel===ch?color:C.muted, fontSize:11, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:5 }}>
                        <span>{icon}</span>{ch}
                      </button>
                    ))}
                  </div>
                </div>

                {/* General: audience + message */}
                {bMode==="general" && (
                  <div style={{ ...card, padding:"16px" }}>
                    <div style={{ fontSize:9, fontWeight:900, color:C.muted, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:10 }}>Target Audience</div>
                    <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:14 }}>
                      {[["all","All Users","👥"],["advocates","Advocates Only","⚖️"],["affiliates","Affiliates Only","🔗"]].map(([v,l,icon])=>(
                        <button key={v} onClick={()=>setBTarget(v)}
                          style={{ textAlign:"left", padding:"9px 12px", borderRadius:9,
                            background:bTarget===v?"rgba(167,139,250,.1)":"rgba(255,255,255,.04)",
                            border:"1px solid "+(bTarget===v?"rgba(167,139,250,.3)":"rgba(255,255,255,.07)"),
                            cursor:"pointer", display:"flex", alignItems:"center", gap:8,
                            color:bTarget===v?"#a78bfa":C.muted, fontWeight:700, fontSize:11 }}>
                          <span>{icon}</span>{l}
                        </button>
                      ))}
                    </div>
                    <div style={{ fontSize:10, fontWeight:700, color:"#64748b", marginBottom:6 }}>Message</div>
                    <textarea value={broadcast} onChange={e=>{ setBroadcast(e.target.value); setBSent(false); }} rows={5}
                      placeholder="Type your broadcast message…" style={{ ...inp, resize:"none" }}/>
                  </div>
                )}

                {/* Send button */}
                {(()=>{
                  const paidList    = AFFILIATES.flatMap(a=>a.subscribers.filter(s=>s.paid&&!isOverdue(s.lastPayDate)));
                  const defaultList = AFFILIATES.flatMap(a=>a.subscribers.filter(s=>!s.paid||isOverdue(s.lastPayDate)));
                  const members     = bMode==="paid"?paidList:bMode==="default"?defaultList:[];
                  const checkedIds  = Object.keys(bChecked).filter(k=>bChecked[k]);
                  const canSend     = bMode==="general" ? broadcast.trim().length>0 : checkedIds.length>0;
                  const sendLabel   = bSending?"⏳ Sending…":bMode==="paid"?"✅ Send to "+checkedIds.length+" Paid":bMode==="default"?"⚠️ Send to "+checkedIds.length+" Defaulted":"📢 Broadcast";

                  const doSend = () => {
                    if(!canSend || bSending) return;
                    setBSending(true);
                    const targets = bMode==="general" ? [] : members.filter(m=>bChecked[m.id]);
                    const count   = bMode==="general"
                      ? (bTarget==="all"?registry.length+AFFILIATES.length:bTarget==="advocates"?registry.length:AFFILIATES.length)
                      : targets.length;
                    const label   = bMode==="paid"?"Paid Subscribers":bMode==="default"?"Defaulted Members":bTarget==="all"?"All Users":bTarget==="advocates"?"Advocates Only":"Affiliates Only";
                    const sampleMsg = bMode==="paid"&&targets[0]
                      ? "Dear "+targets[0].name+", your subscription payment of ₹"+(PLAN_FEE[targets[0].plan]||0)+" was successfully received on "+targets[0].lastPayDate+". Thank you and congratulations!"
                      : bMode==="default"&&targets[0]
                      ? "Dear "+targets[0].name+", your subscription payment is due from "+getNextPayDate(targets[0].lastPayDate)+". Please make payment as soon as possible for uninterrupted services."
                      : broadcast;
                    setTimeout(()=>{
                      setBSending(false);
                      setBDone({ count, channel:bChannel });
                      setBLog(l=>[{ id:Date.now(), type:bMode, target:label, msg:sampleMsg, time:new Date().toLocaleDateString("en-IN")+' '+new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"}), count, channel:bChannel },...l]);
                      setBChecked({}); setBSent(true);
                      setTimeout(()=>{ setBDone(null); setBSent(false); },3000);
                    },1400);
                  };

                  return (
                    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                      <button onClick={doSend} disabled={!canSend||bSending}
                        style={{ padding:"13px 0", background:bMode==="paid"?"#10b981":bMode==="default"?"#ef4444":"#a78bfa",
                          border:"none", borderRadius:12, color:"#fff", fontSize:12, fontWeight:900, cursor:"pointer",
                          opacity:!canSend||bSending?0.45:1 }}>
                        {sendLabel}
                      </button>
                      {bDone && (
                        <div style={{ padding:"11px 14px", background:"rgba(16,185,129,.1)", border:"1px solid rgba(16,185,129,.2)", borderRadius:10, fontSize:12, color:"#10b981", textAlign:"center" }}>
                          ✓ Sent to <strong>{bDone.count}</strong> member{bDone.count!==1?"s":""} via {bDone.channel}
                        </div>
                      )}
                    </div>
                  );
                })()}

              </div>

              {/* RIGHT PANE */}
              <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>

                {/* Paid member list */}
                {bMode==="paid" && (()=>{
                  const members    = AFFILIATES.flatMap(a=>a.subscribers.filter(s=>s.paid&&!isOverdue(s.lastPayDate)).map(s=>({...s,affName:a.name})));
                  const allIds     = members.map(m=>m.id);
                  const checkedIds = allIds.filter(id=>bChecked[id]);
                  const allSel     = allIds.length>0 && allIds.every(id=>bChecked[id]);
                  return (
                    <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", ...card, padding:0 }}>
                      <div style={{ padding:"12px 16px", borderBottom:"1px solid rgba(255,255,255,.06)", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                          <input type="checkbox" checked={allSel} onChange={()=>{ if(allSel){setBChecked({});}else{const o={};allIds.forEach(id=>{o[id]=true;});setBChecked(o);}}} style={{ accentColor:"#10b981", cursor:"pointer" }}/>
                          <span style={{ fontSize:11, fontWeight:700, color:C.muted }}>{checkedIds.length>0?checkedIds.length+" selected":"Select all"}</span>
                        </div>
                        <span style={{ fontSize:11, fontWeight:900, color:"#10b981" }}>✅ {members.length} Paid Member{members.length!==1?"s":""}</span>
                      </div>
                      <div style={{ padding:"10px 16px", borderBottom:"1px solid rgba(255,255,255,.06)", background:"rgba(16,185,129,.03)", flexShrink:0 }}>
                        <div style={{ fontSize:9, fontWeight:900, color:"#10b981", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:4 }}>Message Template</div>
                        <div style={{ fontSize:11, color:C.muted, fontStyle:"italic", lineHeight:1.6 }}>"Dear [Name], your subscription payment of ₹[Amount] was successfully received on [Date]. Thank you and congratulations! Your [Plan] plan is now active."</div>
                      </div>
                      <div style={{ flex:1, overflowY:"auto" }}>
                        {members.map(m=>(
                          <div key={m.id}>
                            <div style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"11px 16px", background:bChecked[m.id]?"rgba(16,185,129,.04)":"transparent", borderBottom:"1px solid rgba(255,255,255,.04)" }}>
                              <input type="checkbox" checked={!!bChecked[m.id]} onChange={()=>setBChecked(c=>({...c,[m.id]:!c[m.id]}))} style={{ marginTop:4, accentColor:"#10b981", cursor:"pointer", flexShrink:0 }}/>
                              <div style={{ flex:1, minWidth:0 }}>
                                <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:4, flexWrap:"wrap" }}>
                                  <span style={{ fontWeight:700, fontSize:13 }}>{m.name}</span>
                                  <span style={{ fontSize:9, padding:"1px 7px", borderRadius:10, background:"rgba(16,185,129,.12)", color:"#10b981", fontWeight:700 }}>PAID</span>
                                  <span style={{ fontSize:9, padding:"1px 7px", borderRadius:10, background:m.plan==="Elite"?"rgba(245,158,11,.12)":m.plan==="Pro"?"rgba(99,102,241,.12)":"rgba(100,116,139,.1)", color:m.plan==="Elite"?"#f59e0b":m.plan==="Pro"?"#818cf8":"#64748b", fontWeight:700 }}>{m.plan} · ₹{PLAN_FEE[m.plan]||0}</span>
                                  <span style={{ fontSize:9, color:C.muted }}>via {m.affName}</span>
                                </div>
                                <div style={{ fontSize:10, color:C.muted }}>Paid on: <strong style={{ color:"#10b981" }}>{m.lastPayDate}</strong> · Next due: {getNextPayDate(m.lastPayDate)}</div>
                              </div>
                              <button onClick={()=>setBPreview(bPreview===m.id?null:m.id)} style={{ ...btn("rgba(255,255,255,.06)",true), flexShrink:0, fontSize:10 }}>{bPreview===m.id?"▲ Hide":"▼ Preview"}</button>
                            </div>
                            {bPreview===m.id && (
                              <div style={{ padding:"12px 16px 14px 42px", background:"rgba(16,185,129,.03)", borderBottom:"1px solid rgba(255,255,255,.06)" }}>
                                <div style={{ fontSize:9, fontWeight:900, color:"#10b981", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:6 }}>Message Preview — {bChannel}</div>
                                <div style={{ fontSize:12, color:C.text, lineHeight:1.7, padding:"12px 14px", background:"rgba(255,255,255,.04)", borderRadius:10, border:"1px solid rgba(255,255,255,.08)", fontStyle:"italic" }}>
                                  {"Dear "+m.name+", your subscription payment of ₹"+(PLAN_FEE[m.plan]||0)+" was successfully received on "+m.lastPayDate+". Thank you and congratulations! Your "+m.plan+" plan is now active. — Nexus Justice Team"}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* Default member list */}
                {bMode==="default" && (()=>{
                  const members    = AFFILIATES.flatMap(a=>a.subscribers.filter(s=>!s.paid||isOverdue(s.lastPayDate)).map(s=>({...s,affName:a.name})));
                  const allIds     = members.map(m=>m.id);
                  const checkedIds = allIds.filter(id=>bChecked[id]);
                  const allSel     = allIds.length>0 && allIds.every(id=>bChecked[id]);
                  return (
                    <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", ...card, padding:0 }}>
                      <div style={{ padding:"12px 16px", borderBottom:"1px solid rgba(255,255,255,.06)", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                          <input type="checkbox" checked={allSel} onChange={()=>{ if(allSel){setBChecked({});}else{const o={};allIds.forEach(id=>{o[id]=true;});setBChecked(o);}}} style={{ accentColor:"#ef4444", cursor:"pointer" }}/>
                          <span style={{ fontSize:11, fontWeight:700, color:C.muted }}>{checkedIds.length>0?checkedIds.length+" selected":"Select all"}</span>
                        </div>
                        <span style={{ fontSize:11, fontWeight:900, color:"#ef4444" }}>⚠️ {members.length} Defaulted Member{members.length!==1?"s":""}</span>
                      </div>
                      <div style={{ padding:"10px 16px", borderBottom:"1px solid rgba(255,255,255,.06)", background:"rgba(239,68,68,.03)", flexShrink:0 }}>
                        <div style={{ fontSize:9, fontWeight:900, color:"#ef4444", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:4 }}>Message Template</div>
                        <div style={{ fontSize:11, color:C.muted, fontStyle:"italic", lineHeight:1.6 }}>"Dear [Name], your subscription payment is due from [Due Date]. Please make your payment as soon as possible to ensure uninterrupted access to Nexus Justice services."</div>
                      </div>
                      <div style={{ flex:1, overflowY:"auto" }}>
                        {members.map(m=>(
                          <div key={m.id}>
                            <div style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"11px 16px", background:bChecked[m.id]?"rgba(239,68,68,.04)":"transparent", borderBottom:"1px solid rgba(255,255,255,.04)" }}>
                              <input type="checkbox" checked={!!bChecked[m.id]} onChange={()=>setBChecked(c=>({...c,[m.id]:!c[m.id]}))} style={{ marginTop:4, accentColor:"#ef4444", cursor:"pointer", flexShrink:0 }}/>
                              <div style={{ flex:1, minWidth:0 }}>
                                <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:4, flexWrap:"wrap" }}>
                                  <span style={{ fontWeight:700, fontSize:13 }}>{m.name}</span>
                                  <span style={{ fontSize:9, padding:"1px 7px", borderRadius:10, background:"rgba(239,68,68,.12)", color:"#ef4444", fontWeight:700 }}>OVERDUE</span>
                                  <span style={{ fontSize:9, padding:"1px 7px", borderRadius:10, background:m.plan==="Elite"?"rgba(245,158,11,.12)":m.plan==="Pro"?"rgba(99,102,241,.12)":"rgba(100,116,139,.1)", color:m.plan==="Elite"?"#f59e0b":m.plan==="Pro"?"#818cf8":"#64748b", fontWeight:700 }}>{m.plan}</span>
                                  <span style={{ fontSize:9, color:C.muted }}>via {m.affName}</span>
                                </div>
                                <div style={{ fontSize:10, color:C.muted }}>Due since: <strong style={{ color:"#ef4444" }}>{getNextPayDate(m.lastPayDate)}</strong> · Last paid: {m.lastPayDate||"Never"}</div>
                              </div>
                              <button onClick={()=>setBPreview(bPreview===m.id?null:m.id)} style={{ ...btn("rgba(255,255,255,.06)",true), flexShrink:0, fontSize:10 }}>{bPreview===m.id?"▲ Hide":"▼ Preview"}</button>
                            </div>
                            {bPreview===m.id && (
                              <div style={{ padding:"12px 16px 14px 42px", background:"rgba(239,68,68,.03)", borderBottom:"1px solid rgba(255,255,255,.06)" }}>
                                <div style={{ fontSize:9, fontWeight:900, color:"#ef4444", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:6 }}>Message Preview — {bChannel}</div>
                                <div style={{ fontSize:12, color:C.text, lineHeight:1.7, padding:"12px 14px", background:"rgba(255,255,255,.04)", borderRadius:10, border:"1px solid rgba(255,255,255,.08)", fontStyle:"italic" }}>
                                  {"Dear "+m.name+", your subscription payment is due from "+getNextPayDate(m.lastPayDate)+". Please make your payment as soon as possible to ensure uninterrupted access to Nexus Justice services. — Nexus Justice Team"}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* General: history log */}
                {bMode==="general" && (
                  <div style={{ flex:1, overflowY:"auto" }}>
                    <div style={{ ...card }}>
                      <div style={{ fontSize:9, fontWeight:900, color:C.muted, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:14 }}>Broadcast History</div>
                      {bLog.map(b=>(
                        <div key={b.id} style={{ padding:"12px 0", borderBottom:"1px solid rgba(255,255,255,.04)", display:"flex", gap:12, alignItems:"flex-start" }}>
                          <span style={{ fontSize:18, flexShrink:0 }}>{b.type==="paid"?"✅":b.type==="default"?"⚠️":"📢"}</span>
                          <div style={{ flex:1 }}>
                            <div style={{ fontSize:12, color:C.text, marginBottom:5, lineHeight:1.5 }}>{b.msg.length>90?b.msg.slice(0,90)+"…":b.msg}</div>
                            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                              <span style={{ fontSize:9, color:"#818cf8", background:"rgba(99,102,241,.1)", padding:"2px 8px", borderRadius:6, fontWeight:700 }}>{b.target}</span>
                              <span style={{ fontSize:9, color:"#10b981", background:"rgba(16,185,129,.1)", padding:"2px 8px", borderRadius:6, fontWeight:700 }}>📨 {b.count} sent</span>
                              <span style={{ fontSize:9, color:C.muted, background:"rgba(255,255,255,.05)", padding:"2px 8px", borderRadius:6 }}>{b.channel}</span>
                              <span style={{ fontSize:9, color:"#334155" }}>{b.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

        {/* ── PAYMENTS ── */}
        {tab==="payments" && (()=>{
          const filteredNotifs = allPayNotifs.filter(n => {
            const q = paySearchQ.toLowerCase();
            const matchQ = !q || n.advName.toLowerCase().includes(q) || n.plan.toLowerCase().includes(q);
            let matchF = true;
            if (payFilter==="overdue")       matchF = n.isOverduePayment;
            if (payFilter==="due-soon")      matchF = !n.isOverduePayment && n.daysUntilDue <= 3;
            if (payFilter==="no-commission") matchF = n.commissionCredited === 0;
            if (payFilter==="has-commission")matchF = n.commissionCredited > 0;
            return matchQ && matchF;
          });

          const overdueCount  = allPayNotifs.filter(n=>n.isOverduePayment).length;
          const dueSoonCount  = allPayNotifs.filter(n=>!n.isOverduePayment && n.daysUntilDue<=3).length;
          const totalDue      = allPayNotifs.reduce((s,n)=>s+n.netPayable,0);
          const hasAccount    = payAccount.upiId || payAccount.accountNumber;

          const notifMsg = (n) => {
            if (n.isFirstPayment && n.commissionCredited > n.fee) {
              const excess = n.commissionCredited - n.fee;
              return { type:"commission-high", color:"#10b981", bg:"rgba(16,185,129,.08)", border:"rgba(16,185,129,.2)",
                icon:"🎉",
                msg: `You have made a commission of ₹${n.commissionCredited.toFixed(0)}. Your commission exceeds your subscription of ₹${n.fee}. Make payment now to get your payment details to us — after the first payment we will send the commissions if any to that account.` };
            }
            if (n.commissionCredited > 0 && n.commissionCredited <= n.fee) {
              return { type:"commission-partial", color:"#f59e0b", bg:"rgba(245,158,11,.08)", border:"rgba(245,158,11,.2)",
                icon:"💳",
                msg: `You have received a commission of ₹${n.commissionCredited.toFixed(0)}. Your monthly subscription is ₹${n.fee}. Make payment of ₹${n.netPayable.toFixed(0)} for uninterrupted services.` };
            }
            return { type:"subscription-only", color:"#ef4444", bg:"rgba(239,68,68,.07)", border:"rgba(239,68,68,.18)",
              icon:"🔔",
              msg: `Your subscription is due on ${n.dueDate} — ₹${n.fee}. Make payment for uninterrupted services.` };
          };

          return (
            <div>
              {/* Page header */}
              <div style={{ marginBottom:24, display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
                <div>
                  <div style={{ fontSize:9, fontWeight:900, color:C.gold, letterSpacing:"0.3em", textTransform:"uppercase", marginBottom:4 }}>Billing & Collections</div>
                  <h2 style={{ fontSize:40, fontWeight:900, fontStyle:"italic", letterSpacing:"-0.04em", margin:0 }}>Payments</h2>
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  {[["notifications","📋 Notifications"],["account","🏦 Receive Account"]].map(([id,label])=>(
                    <button key={id} onClick={()=>setPayTab(id)}
                      style={{ padding:"9px 18px", borderRadius:10, fontSize:11, fontWeight:700, cursor:"pointer", border:"none",
                        background:payTab===id?"rgba(245,158,11,.15)":"rgba(255,255,255,.05)",
                        color:payTab===id?C.gold:C.muted,
                        outline:payTab===id?"1px solid rgba(245,158,11,.3)":"1px solid transparent" }}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* KPI Strip */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:24 }}>
                {[
                  { label:"Total Due This Cycle", val:"₹"+totalDue.toFixed(0),         color:"#f59e0b", icon:"💰" },
                  { label:"Overdue Payments",      val:overdueCount,                    color:"#ef4444", icon:"⚠️" },
                  { label:"Due Within 3 Days",     val:dueSoonCount,                    color:"#fb923c", icon:"⏰" },
                  { label:"Receive Account",        val:hasAccount?"Configured":"Not Set", color:hasAccount?"#10b981":"#ef4444", icon:"🏦" },
                ].map(s=>(
                  <div key={s.label} style={{ ...card, padding:"18px 20px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                      <span style={{ fontSize:20 }}>{s.icon}</span>
                      <div style={{ width:7, height:7, borderRadius:"50%", background:s.color, boxShadow:"0 0 8px "+s.color }} />
                    </div>
                    <div style={{ fontSize:28, fontWeight:900, color:s.color, lineHeight:1, marginBottom:4 }}>{s.val}</div>
                    <div style={{ fontSize:9, color:C.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.12em" }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* ── NOTIFICATIONS TAB ── */}
              {payTab==="notifications" && (
                <div>
                  {/* Filter bar */}
                  <div style={{ ...card, padding:"14px 18px", marginBottom:16, display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
                    <input value={paySearchQ} onChange={e=>setPaySearchQ(e.target.value)} placeholder="Search advocate…"
                      style={{ ...inp, width:200, fontSize:11, padding:"6px 12px" }} />
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                      {[
                        ["all","All","#64748b"],
                        ["overdue","⚠ Overdue","#ef4444"],
                        ["due-soon","⏰ Due Soon","#fb923c"],
                        ["has-commission","💰 Has Commission","#10b981"],
                        ["no-commission","📋 No Commission","#818cf8"],
                      ].map(([v,l,c])=>(
                        <button key={v} onClick={()=>setPayFilter(v)}
                          style={{ padding:"5px 12px", borderRadius:8, fontSize:10, fontWeight:700, cursor:"pointer",
                            background:payFilter===v?"rgba(255,255,255,.09)":"rgba(255,255,255,.04)",
                            border:"1px solid "+(payFilter===v?c+"88":"rgba(255,255,255,.07)"),
                            color:payFilter===v?c:C.muted }}>
                          {l}
                        </button>
                      ))}
                    </div>
                    <span style={{ marginLeft:"auto", fontSize:10, color:C.muted }}>{filteredNotifs.length} advocate{filteredNotifs.length!==1?"s":""}</span>
                  </div>

                  {/* Account not configured warning */}
                  {!hasAccount && (
                    <div style={{ marginBottom:16, padding:"14px 18px", background:"rgba(239,68,68,.06)", border:"1px solid rgba(239,68,68,.2)", borderRadius:14, display:"flex", alignItems:"center", gap:12 }}>
                      <span style={{ fontSize:20 }}>⚠️</span>
                      <div>
                        <div style={{ fontWeight:700, fontSize:12, color:"#ef4444", marginBottom:2 }}>Receive Account Not Configured</div>
                        <div style={{ fontSize:11, color:C.muted }}>Advocates cannot pay you until you set up your Bank / UPI receive account.
                          <button onClick={()=>setPayTab("account")} style={{ background:"none", border:"none", color:"#f59e0b", fontWeight:700, cursor:"pointer", fontSize:11, marginLeft:6, textDecoration:"underline" }}>Set it up →</button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Notification cards */}
                  {filteredNotifs.length === 0 ? (
                    <div style={{ textAlign:"center", padding:60, color:C.muted }}>
                      <div style={{ fontSize:36, marginBottom:10 }}>✅</div>
                      <div style={{ fontSize:14, fontWeight:700 }}>No billing notifications match your filter.</div>
                    </div>
                  ) : (
                    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                      {filteredNotifs.map(n => {
                        const { type, color, bg, border, icon, msg } = notifMsg(n);
                        return (
                          <div key={n.advId} style={{ borderRadius:16, background:bg, border:"1px solid "+border, padding:"16px 20px", display:"flex", alignItems:"flex-start", gap:14 }}>
                            {/* Avatar */}
                            <div style={{ width:40, height:40, borderRadius:"50%", background:"linear-gradient(135deg,#334155,#475569)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:900, flexShrink:0, color:"#fff" }}>
                              {n.advName.split(" ").filter(w=>w[0]).map(w=>w[0]).join("").slice(0,2)}
                            </div>

                            <div style={{ flex:1, minWidth:0 }}>
                              {/* Top row */}
                              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6, flexWrap:"wrap" }}>
                                <span style={{ fontWeight:900, fontSize:14 }}>{n.advName}</span>
                                <span style={{ fontSize:9, padding:"2px 8px", borderRadius:10, fontWeight:700,
                                  background:n.plan==="Elite"?"rgba(245,158,11,.15)":n.plan==="Pro"?"rgba(99,102,241,.15)":"rgba(100,116,139,.15)",
                                  color:n.plan==="Elite"?"#f59e0b":n.plan==="Pro"?"#818cf8":"#64748b" }}>{n.plan}</span>
                                {n.isOverduePayment && <span style={{ fontSize:9, padding:"2px 8px", borderRadius:10, fontWeight:900, background:"rgba(239,68,68,.18)", color:"#ef4444" }}>OVERDUE</span>}
                                {!n.isOverduePayment && n.daysUntilDue<=3 && <span style={{ fontSize:9, padding:"2px 8px", borderRadius:10, fontWeight:900, background:"rgba(251,146,60,.15)", color:"#fb923c" }}>DUE SOON</span>}
                              </div>

                              {/* Notification message */}
                              <div style={{ fontSize:12, color:color, lineHeight:1.7, marginBottom:8, fontWeight:500 }}>
                                <span style={{ marginRight:6 }}>{icon}</span>{msg}
                              </div>

                              {/* Payment breakdown chips */}
                              <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:8 }}>
                                <span style={{ fontSize:10, padding:"3px 10px", borderRadius:8, background:"rgba(255,255,255,.06)", color:C.muted }}>
                                  📅 Due: <strong style={{ color:n.isOverduePayment?"#ef4444":C.text }}>{n.dueDate}</strong>
                                  {" · "}
                                  {n.isOverduePayment ? <span style={{ color:"#ef4444", fontWeight:700 }}>{Math.abs(n.daysUntilDue)}d overdue</span>
                                    : <span style={{ color:n.daysUntilDue<=3?"#fb923c":C.muted }}>in {n.daysUntilDue}d</span>}
                                </span>
                                <span style={{ fontSize:10, padding:"3px 10px", borderRadius:8, background:"rgba(255,255,255,.06)", color:C.muted }}>
                                  💳 Plan Fee: <strong style={{ color:C.text }}>₹{n.fee}</strong>
                                </span>
                                {n.commissionCredited > 0 && (
                                  <span style={{ fontSize:10, padding:"3px 10px", borderRadius:8, background:"rgba(16,185,129,.1)", color:"#10b981" }}>
                                    🏆 Commission Credit: <strong>₹{n.commissionCredited.toFixed(0)}</strong>
                                  </span>
                                )}
                                <span style={{ fontSize:10, padding:"3px 10px", borderRadius:8, background:"rgba(245,158,11,.1)", color:C.gold, fontWeight:700 }}>
                                  Net Payable: ₹{n.netPayable.toFixed(0)}
                                </span>
                              </div>

                              {/* Show payment details if account configured */}
                              {hasAccount && (
                                <div style={{ padding:"10px 14px", background:"rgba(255,255,255,.04)", borderRadius:10, border:"1px solid rgba(255,255,255,.07)", fontSize:11 }}>
                                  <div style={{ fontSize:9, fontWeight:900, color:C.gold, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:6 }}>💳 Payment Details (sent to advocate)</div>
                                  <div style={{ display:"flex", gap:16, flexWrap:"wrap", color:C.muted }}>
                                    {payAccount.upiId && <span>UPI: <strong style={{ color:C.text }}>{payAccount.upiId}</strong></span>}
                                    {payAccount.accountNumber && <span>A/C: <strong style={{ color:C.text }}>{payAccount.accountNumber}</strong> · IFSC: <strong style={{ color:C.text }}>{payAccount.ifsc}</strong></span>}
                                    {payAccount.bankName && <span>Bank: <strong style={{ color:C.text }}>{payAccount.bankName}</strong></span>}
                                    {payAccount.razorpayLink && <span>Pay Link: <a href={payAccount.razorpayLink} target="_blank" style={{ color:"#3395ff" }}>{payAccount.razorpayLink}</a></span>}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* ── RECEIVE ACCOUNT TAB ── */}
              {payTab==="account" && (
                <div style={{ display:"grid", gridTemplateColumns:"1.2fr 1fr", gap:20 }}>

                  {/* Left — form */}
                  <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

                    {/* Bank Account */}
                    <div style={{ ...card }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                        <div style={{ width:36, height:36, borderRadius:10, background:"rgba(99,102,241,.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>🏦</div>
                        <div>
                          <div style={{ fontWeight:900, fontSize:14 }}>Bank Account</div>
                          <div style={{ fontSize:10, color:C.muted }}>Advocates will transfer directly to this account</div>
                        </div>
                      </div>
                      {[
                        ["Bank Name",       "bankName",       "text",   "e.g. State Bank of India"],
                        ["Account Holder",  "accountName",    "text",   "As per bank records"],
                        ["Account Number",  "accountNumber",  "text",   "12-digit account number"],
                        ["IFSC Code",       "ifsc",           "text",   "e.g. SBIN0001234"],
                      ].map(([label, key, type, placeholder]) => (
                        <div key={key} style={{ marginBottom:12 }}>
                          <div style={{ fontSize:10, fontWeight:700, color:"#64748b", marginBottom:5 }}>{label}</div>
                          <input type={type} value={payAccount[key]} onChange={e=>setPayAccount(p=>({...p,[key]:e.target.value}))}
                            placeholder={placeholder} style={inp} />
                        </div>
                      ))}
                    </div>

                    {/* UPI */}
                    <div style={{ ...card }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                        <div style={{ width:36, height:36, borderRadius:10, background:"rgba(16,185,129,.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>📲</div>
                        <div>
                          <div style={{ fontWeight:900, fontSize:14 }}>UPI ID</div>
                          <div style={{ fontSize:10, color:C.muted }}>Instant payment via any UPI app</div>
                        </div>
                      </div>
                      <div style={{ marginBottom:12 }}>
                        <div style={{ fontSize:10, fontWeight:700, color:"#64748b", marginBottom:5 }}>UPI ID / VPA</div>
                        <input value={payAccount.upiId} onChange={e=>setPayAccount(p=>({...p,upiId:e.target.value}))}
                          placeholder="agency@upi or agencyname@okaxis" style={inp} />
                      </div>
                    </div>

                    {/* Razorpay payment link */}
                    <div style={{ ...card }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                        <div style={{ width:36, height:36, borderRadius:10, background:"rgba(51,149,255,.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>💳</div>
                        <div>
                          <div style={{ fontWeight:900, fontSize:14 }}>Razorpay Payment Link</div>
                          <div style={{ fontSize:10, color:C.muted }}>Optional — share a direct payment link</div>
                        </div>
                      </div>
                      <div style={{ marginBottom:12 }}>
                        <div style={{ fontSize:10, fontWeight:700, color:"#64748b", marginBottom:5 }}>Payment Page URL</div>
                        <input value={payAccount.razorpayLink} onChange={e=>setPayAccount(p=>({...p,razorpayLink:e.target.value}))}
                          placeholder="https://rzp.io/l/yourlink" style={inp} />
                      </div>
                    </div>

                    <button onClick={savePayAccount}
                      style={{ padding:"13px 0", background:C.gold, border:"none", borderRadius:12, color:"#000", fontSize:13, fontWeight:900, cursor:"pointer" }}>
                      {payAccountSaved ? "✓ Account Saved!" : "💾 Save Receive Account"}
                    </button>
                  </div>

                  {/* Right — preview */}
                  <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                    <div style={{ ...card, borderColor:"rgba(245,158,11,.2)", background:"rgba(245,158,11,.03)" }}>
                      <div style={{ fontSize:9, fontWeight:900, color:C.gold, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:14 }}>Preview — What Advocate Sees</div>
                      <div style={{ padding:"16px", background:"rgba(255,255,255,.04)", borderRadius:12, border:"1px solid rgba(255,255,255,.08)" }}>
                        <div style={{ fontWeight:900, fontSize:13, marginBottom:12, color:C.gold }}>💳 Payment Details — Nexus Justice</div>
                        {payAccount.accountNumber ? (
                          <div style={{ marginBottom:10 }}>
                            <div style={{ fontSize:9, color:C.muted, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:4 }}>Bank Transfer</div>
                            <div style={{ fontSize:12, color:C.text, lineHeight:1.9 }}>
                              <div>Bank: <strong>{payAccount.bankName||"—"}</strong></div>
                              <div>Account Name: <strong>{payAccount.accountName||"—"}</strong></div>
                              <div>Account No: <strong style={{ fontFamily:"monospace" }}>{payAccount.accountNumber||"—"}</strong></div>
                              <div>IFSC: <strong style={{ fontFamily:"monospace" }}>{payAccount.ifsc||"—"}</strong></div>
                            </div>
                          </div>
                        ) : <div style={{ fontSize:11, color:"#334155", fontStyle:"italic", marginBottom:10 }}>Bank account not filled in yet.</div>}
                        {payAccount.upiId ? (
                          <div style={{ marginBottom:10, padding:"10px 12px", background:"rgba(16,185,129,.08)", borderRadius:10, border:"1px solid rgba(16,185,129,.2)" }}>
                            <div style={{ fontSize:9, color:"#10b981", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:3 }}>📲 Pay via UPI</div>
                            <div style={{ fontSize:14, fontWeight:900, fontFamily:"monospace", color:"#10b981" }}>{payAccount.upiId}</div>
                          </div>
                        ) : <div style={{ fontSize:11, color:"#334155", fontStyle:"italic", marginBottom:10 }}>UPI ID not filled in yet.</div>}
                        {payAccount.razorpayLink && (
                          <div style={{ padding:"10px 12px", background:"rgba(51,149,255,.08)", borderRadius:10, border:"1px solid rgba(51,149,255,.2)" }}>
                            <div style={{ fontSize:9, color:"#3395ff", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:3 }}>💳 Pay Online</div>
                            <div style={{ fontSize:12, color:"#3395ff", wordBreak:"break-all" }}>{payAccount.razorpayLink}</div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ ...card }}>
                      <div style={{ fontSize:9, fontWeight:900, color:C.muted, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:12 }}>How It Works</div>
                      {[
                        ["1","Advocate receives notification","auto-calculated on 31st day from their joining date"],
                        ["2","Commission offset applied","if they referred subscribers, commission is deducted"],
                        ["3","Net amount shown","advocate sees exactly what to pay"],
                        ["4","Your account details included","bank/UPI sent with every notification"],
                        ["5","Payment confirmation","mark as paid from Advocates tab after receipt"],
                      ].map(([num,title,sub])=>(
                        <div key={num} style={{ display:"flex", gap:10, padding:"8px 0", borderBottom:"1px solid rgba(255,255,255,.04)" }}>
                          <div style={{ width:22, height:22, borderRadius:"50%", background:C.gold, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:900, color:"#000", flexShrink:0 }}>{num}</div>
                          <div>
                            <div style={{ fontSize:11, fontWeight:700, color:C.text }}>{title}</div>
                            <div style={{ fontSize:10, color:C.muted }}>{sub}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* ── KNOWLEDGE BASE ── */}
        {tab==="knowledge" && (()=>{
          const fileIcon  = t => t==="pdf"?"📄":t==="docx"?"📝":t==="txt"?"📃":t==="xlsx"?"📊":"📎";
          const typeColor = t => t==="pdf"?"#ef4444":t==="docx"?"#3395ff":t==="txt"?"#10b981":t==="xlsx"?"#22c55e":"#a78bfa";
          const accLabel  = a => a==="all"?"All Subscribers":a==="pro-elite"?"Pro & Elite Only":"Elite Only";
          const accColor  = a => a==="all"?"#10b981":a==="pro-elite"?"#f59e0b":"#fb923c";
          const accBg     = a => a==="all"?"rgba(16,185,129,.1)":a==="pro-elite"?"rgba(245,158,11,.1)":"rgba(251,146,60,.1)";

          const filtered = globalDocs.filter(d => {
            const q  = kbSearchQ.toLowerCase();
            const mQ = !q || d.name.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q) || d.category.toLowerCase().includes(q);
            const mC = kbCatFilter==="all"  || d.category===kbCatFilter;
            const mT = kbTypeFilter==="all" || d.type===kbTypeFilter;
            const mA = kbAccFilter==="all"  || d.access===kbAccFilter;
            return mQ && mC && mT && mA;
          });

          const categories  = [...new Set(globalDocs.map(d=>d.category))];
          const totalSize   = globalDocs.length + " files";

          return (
            <div>
              {/* Page header */}
              <div style={{ marginBottom:24, display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
                <div>
                  <div style={{ fontSize:9, fontWeight:900, color:"#818cf8", letterSpacing:"0.3em", textTransform:"uppercase", marginBottom:4 }}>Shared AI Intelligence</div>
                  <h2 style={{ fontSize:40, fontWeight:900, fontStyle:"italic", letterSpacing:"-0.04em", margin:0 }}>Global Knowledge Base</h2>
                  <p style={{ fontSize:12, color:C.muted, marginTop:6, marginBottom:0, maxWidth:560 }}>
                    Upload laws, acts, court templates and model drafts here. Every advocate subscriber's AI (LEXI) automatically uses these documents for legal research and drafting.
                  </p>
                </div>
                <button onClick={()=>{ setShowUploadModal(true); setUploadDone(false); }}
                  style={{ ...btn("#818cf8"), display:"flex", alignItems:"center", gap:7, fontSize:12 }}>
                  ⬆ Upload Document
                </button>
              </div>

              {/* KPI strip */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:24 }}>
                {[
                  { label:"Total Documents",  val:globalDocs.length,  color:"#6366f1", icon:"📚", sub:"In global library" },
                  { label:"Law Categories",   val:categories.length,  color:"#10b981", icon:"⚖️", sub:"Legal domains covered" },
                  { label:"Templates",        val:globalDocs.filter(d=>d.type==="docx").length, color:"#3395ff", icon:"📝", sub:"Draft models & templates" },
                  { label:"Access Levels",    val:"3 tiers",          color:"#f59e0b", icon:"🔐", sub:"All / Pro+Elite / Elite" },
                ].map(s=>(
                  <div key={s.label} style={{ ...card, padding:"16px 20px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                      <span style={{ fontSize:20 }}>{s.icon}</span>
                      <div style={{ width:7, height:7, borderRadius:"50%", background:s.color, boxShadow:"0 0 8px "+s.color }} />
                    </div>
                    <div style={{ fontSize:28, fontWeight:900, color:s.color, lineHeight:1, marginBottom:3 }}>{s.val}</div>
                    <div style={{ fontSize:9, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:"0.12em" }}>{s.label}</div>
                    <div style={{ fontSize:9, color:"#334155", marginTop:3 }}>{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* How it works */}
              <div style={{ marginBottom:20, padding:"14px 18px", background:"rgba(99,102,241,.06)", border:"1px solid rgba(99,102,241,.18)", borderRadius:14, display:"flex", gap:14, alignItems:"flex-start" }}>
                <span style={{ fontSize:24, flexShrink:0 }}>🌐</span>
                <div>
                  <div style={{ fontWeight:800, fontSize:13, color:"#818cf8", marginBottom:4 }}>How LEXI uses this library</div>
                  <div style={{ fontSize:11, color:C.muted, lineHeight:1.8 }}>
                    Every document uploaded here becomes part of LEXI's legal intelligence layer — accessible by <strong style={{ color:C.text }}>all subscribers</strong> (or restricted by access level). When an advocate asks LEXI to draft a bail application, research a statute, or cite a precedent, LEXI automatically references the relevant documents from this library. Upload the full text of Acts, model drafts, court formats, and judgment templates for best results.
                  </div>
                  <div style={{ display:"flex", gap:16, marginTop:10, flexWrap:"wrap" }}>
                    {[
                      ["📄 PDFs", "Full text of Acts & judgments"],
                      ["📝 DOCX", "Model drafts & court templates"],
                      ["📃 TXT",  "Quick reference & clause banks"],
                      ["📊 XLSX", "Schedules & form registers"],
                    ].map(([type, desc])=>(
                      <div key={type} style={{ fontSize:10, color:C.muted }}><strong style={{ color:C.text }}>{type}</strong> — {desc}</div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Filter bar */}
              <div style={{ ...card, padding:"14px 18px", marginBottom:16, display:"flex", alignItems:"flex-end", gap:12, flexWrap:"wrap" }}>
                <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                  <div style={{ fontSize:9, fontWeight:700, color:"#64748b", textTransform:"uppercase" }}>Search</div>
                  <input value={kbSearchQ} onChange={e=>setKbSearchQ(e.target.value)}
                    placeholder="File name, description, category…"
                    style={{ ...inp, width:220, fontSize:11, padding:"7px 12px" }} />
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                  <div style={{ fontSize:9, fontWeight:700, color:"#64748b", textTransform:"uppercase" }}>Category</div>
                  <select value={kbCatFilter} onChange={e=>setKbCatFilter(e.target.value)} style={{ ...sInp, minWidth:190 }}>
                    <option value="all">All Categories</option>
                    {KB_CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                  <div style={{ fontSize:9, fontWeight:700, color:"#64748b", textTransform:"uppercase" }}>File Type</div>
                  <select value={kbTypeFilter} onChange={e=>setKbTypeFilter(e.target.value)} style={{ ...sInp, minWidth:110 }}>
                    <option value="all">All Types</option>
                    {["pdf","docx","txt","xlsx"].map(t=><option key={t} value={t}>{t.toUpperCase()}</option>)}
                  </select>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                  <div style={{ fontSize:9, fontWeight:700, color:"#64748b", textTransform:"uppercase" }}>Access</div>
                  <select value={kbAccFilter} onChange={e=>setKbAccFilter(e.target.value)} style={{ ...sInp, minWidth:140 }}>
                    <option value="all">All Access Levels</option>
                    <option value="all-subs">All Subscribers</option>
                    <option value="pro-elite">Pro & Elite Only</option>
                    <option value="elite">Elite Only</option>
                  </select>
                </div>
                {(kbSearchQ||kbCatFilter!=="all"||kbTypeFilter!=="all"||kbAccFilter!=="all") && (
                  <button onClick={()=>{ setKbSearchQ(""); setKbCatFilter("all"); setKbTypeFilter("all"); setKbAccFilter("all"); }}
                    style={{ ...btn("rgba(239,68,68,.1)",true), color:"#ef4444", alignSelf:"flex-end" }}>✕ Clear</button>
                )}
                <span style={{ marginLeft:"auto", alignSelf:"flex-end", fontSize:10, color:C.muted, paddingBottom:2 }}>
                  {filtered.length} of {globalDocs.length} document{globalDocs.length!==1?"s":""}
                </span>
              </div>

              {/* Document grid */}
              {filtered.length===0 ? (
                <div style={{ textAlign:"center", padding:60, color:C.muted }}>
                  <div style={{ fontSize:40, marginBottom:10 }}>📭</div>
                  <div style={{ fontSize:14, fontWeight:700, color:C.text }}>No documents found.</div>
                  <div style={{ fontSize:11, marginTop:6 }}>Try adjusting your filters or upload a new document.</div>
                  <button onClick={()=>setShowUploadModal(true)} style={{ ...btn("#818cf8"), marginTop:16 }}>⬆ Upload Document</button>
                </div>
              ) : (
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  {filtered.map(doc => (
                    <div key={doc.id} style={{
                      background:deleteConfirm===doc.id?"rgba(239,68,68,.07)":C.card,
                      borderRadius:16, padding:"16px 18px",
                      border:"1px solid "+(deleteConfirm===doc.id?"rgba(239,68,68,.3)":C.border),
                      borderLeft:"3px solid "+typeColor(doc.type),
                      display:"flex", gap:14, alignItems:"flex-start",
                      transition:"border-color .2s"
                    }}>
                      {/* Icon */}
                      <div style={{ width:46, height:46, borderRadius:12, flexShrink:0,
                        background:"rgba(255,255,255,.05)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>
                        {fileIcon(doc.type)}
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        {/* Name + delete */}
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8, marginBottom:4 }}>
                          <div style={{ fontWeight:800, fontSize:13, color:C.text, lineHeight:1.3, wordBreak:"break-word" }}>{doc.name}</div>
                          {deleteConfirm===doc.id ? (
                            <div style={{ display:"flex", gap:5, flexShrink:0, alignItems:"center" }}>
                              <span style={{ fontSize:10, color:"#ef4444", fontWeight:700, whiteSpace:"nowrap" }}>Delete?</span>
                              <button onClick={()=>{ setGlobalDocs(d=>d.filter(x=>x.id!==doc.id)); setDeleteConfirm(null); }}
                                style={{ ...btn("rgba(239,68,68,.2)",true), color:"#ef4444" }}>Yes</button>
                              <button onClick={()=>setDeleteConfirm(null)} style={btn("rgba(255,255,255,.07)",true)}>No</button>
                            </div>
                          ) : (
                            <button onClick={()=>setDeleteConfirm(doc.id)}
                              style={{ ...btn("rgba(239,68,68,.1)",true), color:"#ef4444", padding:"4px 9px", flexShrink:0 }}>🗑</button>
                          )}
                        </div>
                        {/* Description */}
                        <div style={{ fontSize:10, color:C.muted, marginBottom:8, lineHeight:1.5 }}>{doc.desc}</div>
                        {/* Chips */}
                        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                          <span style={{ fontSize:9, padding:"2px 8px", borderRadius:8, fontWeight:700,
                            background:"rgba(255,255,255,.06)", color:C.muted }}>
                            {doc.category}
                          </span>
                          <span style={{ fontSize:9, padding:"2px 8px", borderRadius:8, fontWeight:800,
                            background:"rgba(255,255,255,.05)", color:typeColor(doc.type), textTransform:"uppercase" }}>
                            {doc.type}
                          </span>
                          <span style={{ fontSize:9, padding:"2px 8px", borderRadius:8,
                            background:"rgba(255,255,255,.04)", color:"#475569" }}>
                            {doc.size}
                          </span>
                          <span style={{ fontSize:9, padding:"2px 8px", borderRadius:8,
                            background:"rgba(255,255,255,.04)", color:"#475569" }}>
                            📅 {doc.uploadedOn}
                          </span>
                          <span style={{ fontSize:9, padding:"2px 8px", borderRadius:8, fontWeight:700,
                            background:accBg(doc.access), color:accColor(doc.access) }}>
                            👁 {accLabel(doc.access)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── UPLOAD MODAL ── */}
              {showUploadModal && (
                <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setShowUploadModal(false)}>
                  <div style={{ ...card, width:540, maxHeight:"90vh", overflowY:"auto", borderRadius:24 }}>
                    {/* Header */}
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
                      <div>
                        <div style={{ fontSize:9, fontWeight:900, color:"#818cf8", letterSpacing:"0.25em", textTransform:"uppercase", marginBottom:4 }}>🌐 Global Knowledge Base</div>
                        <h3 style={{ fontSize:22, fontWeight:900, fontStyle:"italic", margin:0 }}>Upload Document</h3>
                      </div>
                      <button onClick={()=>setShowUploadModal(false)} style={{ background:"none", border:"none", color:C.muted, fontSize:20, cursor:"pointer" }}>✕</button>
                    </div>

                    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                      {/* File name + type */}
                      <div>
                        <div style={{ fontSize:10, fontWeight:700, color:"#64748b", marginBottom:5 }}>Document Name</div>
                        <div style={{ display:"flex", gap:8 }}>
                          <input value={uploadForm.name} onChange={e=>setUploadForm(f=>({...f,name:e.target.value}))}
                            placeholder="e.g. Consumer Protection Act 2019.pdf"
                            style={{ ...inp, flex:1 }} />
                          <select value={uploadForm.type} onChange={e=>setUploadForm(f=>({...f,type:e.target.value}))}
                            style={{ ...sInp, minWidth:90 }}>
                            {["pdf","docx","txt","xlsx"].map(t=><option key={t} value={t}>{t.toUpperCase()}</option>)}
                          </select>
                        </div>
                        <div style={{ fontSize:9, color:"#475569", marginTop:4 }}>
                          In production this connects to a real file upload. Enter the document name here.
                        </div>
                      </div>

                      {/* Category */}
                      <div>
                        <div style={{ fontSize:10, fontWeight:700, color:"#64748b", marginBottom:5 }}>Legal Category</div>
                        <select value={uploadForm.category} onChange={e=>setUploadForm(f=>({...f,category:e.target.value}))}
                          style={{ ...inp, cursor:"pointer" }}>
                          {KB_CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>

                      {/* Description */}
                      <div>
                        <div style={{ fontSize:10, fontWeight:700, color:"#64748b", marginBottom:5 }}>Description</div>
                        <textarea value={uploadForm.desc} onChange={e=>setUploadForm(f=>({...f,desc:e.target.value}))}
                          rows={2} placeholder="Brief description — what this document covers and when LEXI should use it…"
                          style={{ ...inp, resize:"none" }} />
                      </div>

                      {/* Size */}
                      <div>
                        <div style={{ fontSize:10, fontWeight:700, color:"#64748b", marginBottom:5 }}>File Size <span style={{ color:"#334155", fontWeight:400 }}>(optional)</span></div>
                        <input value={uploadForm.size} onChange={e=>setUploadForm(f=>({...f,size:e.target.value}))}
                          placeholder="e.g. 1.4 MB" style={{ ...inp }} />
                      </div>

                      {/* Access level */}
                      <div>
                        <div style={{ fontSize:10, fontWeight:700, color:"#64748b", marginBottom:8 }}>Subscriber Access Level</div>
                        <div style={{ display:"flex", gap:8 }}>
                          {[
                            ["all","🌐 All Subscribers","#10b981"],
                            ["pro-elite","⭐ Pro & Elite","#f59e0b"],
                            ["elite","👑 Elite Only","#fb923c"],
                          ].map(([v,l,c])=>(
                            <button key={v} onClick={()=>setUploadForm(f=>({...f,access:v}))}
                              style={{ flex:1, padding:"10px 8px", borderRadius:10, border:"none", cursor:"pointer",
                                fontSize:10, fontWeight:700, textAlign:"center",
                                background:uploadForm.access===v?`rgba(${c==="10b981"?"16,185,129":c==="f59e0b"?"245,158,11":"251,146,60"},.12)`:"rgba(255,255,255,.05)",
                                color:uploadForm.access===v?c:C.muted,
                                outline:uploadForm.access===v?"1px solid "+c+"55":"1px solid transparent" }}>
                              {l}
                            </button>
                          ))}
                        </div>
                        <div style={{ fontSize:9, color:"#475569", marginTop:5 }}>
                          Controls which subscribers' LEXI instances can access this document.
                        </div>
                      </div>

                      {/* Info */}
                      <div style={{ padding:"11px 14px", background:"rgba(129,140,248,.06)", border:"1px solid rgba(129,140,248,.15)", borderRadius:10 }}>
                        <div style={{ fontSize:9, fontWeight:900, color:"#818cf8", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:4 }}>How LEXI Will Use This</div>
                        <div style={{ fontSize:11, color:C.muted, lineHeight:1.7 }}>
                          Once uploaded, LEXI automatically indexes this document. When any qualifying advocate asks for legal research, drafting, or citations related to <strong style={{ color:C.text }}>{uploadForm.category}</strong>, LEXI will reference and apply this document in its responses.
                        </div>
                      </div>

                      {/* Buttons */}
                      <div style={{ display:"flex", gap:10 }}>
                        <button onClick={doUpload} disabled={!uploadForm.name||uploadDoing}
                          style={{ ...btn("#818cf8"), flex:1, fontSize:12, opacity:!uploadForm.name||uploadDoing?0.5:1 }}>
                          {uploadDoing?"⏳ Uploading…":uploadDone?"✅ Uploaded!":"⬆ Upload to Global KB"}
                        </button>
                        <button onClick={()=>setShowUploadModal(false)} style={btn("rgba(255,255,255,.07)")}>Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          );
        })()}

        {/* ── CONNECTIVITY ── */}
        {tab==="connectivity" && (()=>{

          const SecretField = ({ label, stateKey, placeholder, note }) => (
            <div>
              <div style={{ fontSize:10, fontWeight:700, color:"#64748b", marginBottom:5 }}>{label}</div>
              <div style={{ position:"relative" }}>
                <input
                  type={showSecret[stateKey]?"text":"password"}
                  value={conn[stateKey]}
                  onChange={e=>setC(stateKey,e.target.value)}
                  placeholder={placeholder}
                  style={{ ...inp, paddingRight:40 }}
                />
                <button onClick={()=>toggleSecret(stateKey)} style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", color:C.muted, cursor:"pointer", fontSize:14, padding:0 }}>
                  {showSecret[stateKey]?"🙈":"👁"}
                </button>
              </div>
              {note && <div style={{ fontSize:9, color:"#475569", marginTop:4 }}>{note}</div>}
            </div>
          );

          const Field = ({ label, stateKey, placeholder, type="text", note, disabled }) => (
            <div>
              <div style={{ fontSize:10, fontWeight:700, color:"#64748b", marginBottom:5 }}>{label}</div>
              <input
                type={type}
                value={conn[stateKey]}
                onChange={e=>setC(stateKey,e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                style={{ ...inp, opacity:disabled?0.5:1 }}
              />
              {note && <div style={{ fontSize:9, color:"#475569", marginTop:4 }}>{note}</div>}
            </div>
          );

          const ServiceCard = ({ id, icon, title, subtitle, accentColor, connected, children }) => (
            <div style={{ ...card, borderColor:connected?"rgba(16,185,129,.25)":C.border, position:"relative", overflow:"visible" }}>
              {/* Top bar */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:44, height:44, borderRadius:14, background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.08)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>{icon}</div>
                  <div>
                    <div style={{ fontWeight:900, fontSize:15, letterSpacing:"-0.02em" }}>{title}</div>
                    <div style={{ fontSize:10, color:C.muted }}>{subtitle}</div>
                  </div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  {connected && (
                    <span style={{ display:"flex", alignItems:"center", gap:5, fontSize:10, fontWeight:700, color:"#10b981", background:"rgba(16,185,129,.1)", border:"1px solid rgba(16,185,129,.2)", padding:"4px 10px", borderRadius:20 }}>
                      <span style={{ width:6, height:6, borderRadius:"50%", background:"#10b981", display:"inline-block", boxShadow:"0 0 6px #10b981" }}/>
                      Connected
                    </span>
                  )}
                  {!connected && (
                    <span style={{ display:"flex", alignItems:"center", gap:5, fontSize:10, fontWeight:700, color:"#475569", background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.08)", padding:"4px 10px", borderRadius:20 }}>
                      <span style={{ width:6, height:6, borderRadius:"50%", background:"#475569", display:"inline-block" }}/>
                      Not Connected
                    </span>
                  )}
                </div>
              </div>

              {/* Accent line */}
              <div style={{ height:2, background:"linear-gradient(90deg,"+accentColor+",transparent)", borderRadius:2, marginBottom:20, opacity:connected?1:0.3 }}/>

              {/* Fields */}
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {children}
              </div>
            </div>
          );

          const ActionRow = ({ sectionId, connKey, saveLabel="Save", testLabel="Test Connection", onTest }) => (
            <div style={{ display:"flex", gap:8, marginTop:6, paddingTop:16, borderTop:"1px solid rgba(255,255,255,.06)" }}>
              <button
                onClick={()=>saveSection(sectionId)}
                style={{ ...btn(C.gold,true) }}>
                {connSaved[sectionId] ? "✓ Saved!" : "💾 "+saveLabel}
              </button>
              <button
                onClick={()=>testSection(connKey)}
                disabled={connTest[connKey]}
                style={{ ...btn("rgba(99,102,241,.2)",true), color:"#818cf8", opacity:connTest[connKey]?0.7:1 }}>
                {connTest[connKey] ? "Testing…" : "⚡ "+testLabel}
              </button>
              {conn[connKey+"Connected"] && (
                <button
                  onClick={()=>setConn(c=>({...c,[connKey+"Connected"]:false}))}
                  style={{ ...btn("rgba(239,68,68,.1)",true), color:"#ef4444" }}>
                  Disconnect
                </button>
              )}
            </div>
          );

          return (
            <div>
              {/* Page header */}
              <div style={{ marginBottom:28 }}>
                <div style={{ fontSize:9, fontWeight:900, color:"#a78bfa", letterSpacing:"0.3em", textTransform:"uppercase", marginBottom:4 }}>Integrations</div>
                <h2 style={{ fontSize:40, fontWeight:900, fontStyle:"italic", letterSpacing:"-0.04em", margin:0 }}>Connectivity</h2>
                <p style={{ fontSize:12, color:C.muted, marginTop:6 }}>Configure all external service integrations for Nexus Justice. Credentials are encrypted at rest.</p>
              </div>

              {/* Status overview strip */}
              <div style={{ display:"flex", gap:10, marginBottom:28, flexWrap:"wrap" }}>
                {[
                  { label:"Telephony",    connected:conn.telConnected,         icon:"📞" },
                  { label:"WhatsApp",     connected:conn.waConnected,          icon:"💬" },
                  { label:"Razorpay",     connected:conn.rzpConnected,         icon:"💳" },
                  { label:"App Webhook",  connected:conn.appWebhookConnected,  icon:"🔗" },
                  { label:"Virtual No.",  connected:!!conn.virtualNum,         icon:"📱" },
                ].map(s=>(
                  <div key={s.label} style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 14px", background:"rgba(255,255,255,.04)", borderRadius:12, border:"1px solid "+(s.connected?"rgba(16,185,129,.2)":"rgba(255,255,255,.07)") }}>
                    <span style={{ fontSize:16 }}>{s.icon}</span>
                    <span style={{ fontSize:11, fontWeight:700, color:s.connected?"#10b981":C.muted }}>{s.label}</span>
                    <span style={{ width:7, height:7, borderRadius:"50%", background:s.connected?"#10b981":"#334155", boxShadow:s.connected?"0 0 6px #10b981":"none" }}/>
                  </div>
                ))}
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>

                {/* ── TELEPHONY ── */}
                <ServiceCard id="tel" icon="📞" title="Telephone Provider" subtitle="SIP / VoIP API for call handling" accentColor="#6366f1" connected={conn.telConnected}>
                  <div>
                    <div style={{ fontSize:10, fontWeight:700, color:"#64748b", marginBottom:6 }}>Provider</div>
                    <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                      {["Twilio","Exotel","Plivo","Knowlarity","Custom"].map(p=>(
                        <button key={p} onClick={()=>setC("telProvider",p)} style={{ padding:"6px 14px", borderRadius:8, background:conn.telProvider===p?"rgba(99,102,241,.2)":"rgba(255,255,255,.05)", border:"1px solid "+(conn.telProvider===p?"rgba(99,102,241,.4)":"rgba(255,255,255,.08)"), color:conn.telProvider===p?"#818cf8":C.muted, fontSize:10, fontWeight:700, cursor:"pointer" }}>{p}</button>
                      ))}
                    </div>
                  </div>
                  <Field label="API Key / Account SID" stateKey="telApiKey" placeholder="e.g. ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"/>
                  <SecretField label="API Secret / Auth Token" stateKey="telApiSecret" placeholder="Your API secret" note="Stored encrypted. Never shared."/>
                  <Field label="Virtual Number (assigned by provider)" stateKey="telVirtualNum" placeholder="+91 90000 00000" type="tel" note="This is the number advocates' clients will call."/>
                  <ActionRow sectionId="tel" connKey="tel" saveLabel="Save Telephony" testLabel="Test Call API"/>
                </ServiceCard>

                {/* ── WHATSAPP ── */}
                <ServiceCard id="wa" icon="💬" title="WhatsApp Business" subtitle="Meta Business API for WhatsApp messaging" accentColor="#25d366" connected={conn.waConnected}>
                  <Field label="WhatsApp Business Number" stateKey="waNumber" placeholder="+91 98765 00000" type="tel" note="The number registered with Meta Business API."/>
                  <SecretField label="Permanent Access Token" stateKey="waToken" placeholder="EAAxxxxxxxxxxxxxx" note="From Meta Business Manager → WhatsApp → API Setup."/>
                  <div>
                    <div style={{ fontSize:10, fontWeight:700, color:"#64748b", marginBottom:5 }}>Webhook Verify Token</div>
                    <div style={{ padding:"10px 14px", background:"rgba(255,255,255,.03)", borderRadius:10, border:"1px dashed rgba(255,255,255,.1)", fontSize:11, color:"#818cf8", fontFamily:"monospace", letterSpacing:"0.03em" }}>
                      nexus-wa-{"{your-deploy-id}"}
                    </div>
                    <div style={{ fontSize:9, color:"#475569", marginTop:4 }}>Auto-generated on deployment. Configure this in Meta Webhook settings.</div>
                  </div>
                  <ActionRow sectionId="wa" connKey="wa" saveLabel="Save WhatsApp" testLabel="Send Test Message"/>
                </ServiceCard>

                {/* ── RAZORPAY ── */}
                <ServiceCard id="rzp" icon="💳" title="Razorpay" subtitle="Payment gateway for subscriptions and payouts" accentColor="#3395ff" connected={conn.rzpConnected}>
                  <div style={{ display:"flex", gap:8 }}>
                    {["Live","Test"].map(m=>(
                      <div key={m} style={{ flex:1, padding:"10px 14px", background:"rgba(255,255,255,.04)", borderRadius:10, border:"1px solid rgba(255,255,255,.08)", textAlign:"center", cursor:"pointer" }}
                        onClick={()=>setC("rzpMode",m)}>
                        <div style={{ fontSize:11, fontWeight:700, color:conn.rzpMode===m?"#3395ff":C.muted }}>{m} Mode</div>
                        <div style={{ fontSize:9, color:"#334155", marginTop:2 }}>{m==="Live"?"Real transactions":"rzp_test_… keys"}</div>
                      </div>
                    ))}
                  </div>
                  <Field label="Key ID" stateKey="rzpKeyId" placeholder="rzp_live_xxxxxxxxxxxx" note="From Razorpay Dashboard → Settings → API Keys."/>
                  <SecretField label="Key Secret" stateKey="rzpKeySecret" placeholder="Your Razorpay Key Secret"/>
                  <SecretField label="Webhook Secret" stateKey="rzpWebhookSecret" placeholder="Webhook signing secret" note="Used to verify payment event signatures."/>
                  <div style={{ padding:"10px 14px", background:"rgba(51,149,255,.06)", borderRadius:10, border:"1px solid rgba(51,149,255,.15)" }}>
                    <div style={{ fontSize:9, fontWeight:900, color:"#3395ff", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:6 }}>Webhook URL (set in Razorpay Dashboard)</div>
                    <div style={{ fontFamily:"monospace", fontSize:11, color:"#e2e8f0" }}>https://nexusjustice.in/api/webhooks/razorpay</div>
                    <div style={{ fontSize:9, color:"#475569", marginTop:4 }}>Add this URL in Razorpay Dashboard → Settings → Webhooks</div>
                  </div>
                  <ActionRow sectionId="rzp" connKey="rzp" saveLabel="Save Razorpay" testLabel="Verify Keys"/>
                </ServiceCard>

                {/* ── APP WEBHOOKS + VIRTUAL NUMBER ── */}
                <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

                  {/* App Webhook */}
                  <ServiceCard id="appwh" icon="🔗" title="App Webhook" subtitle="Receive events from external services" accentColor="#a78bfa" connected={conn.appWebhookConnected}>
                    <div>
                      <div style={{ fontSize:10, fontWeight:700, color:"#64748b", marginBottom:5 }}>Incoming Webhook URL</div>
                      <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                        <input
                          value={conn.appWebhookUrl}
                          onChange={e=>setC("appWebhookUrl",e.target.value)}
                          placeholder="https://your-app.com/webhook  ← enter after deployment"
                          style={{ ...inp, flex:1 }}
                        />
                        {conn.appWebhookUrl && (
                          <button onClick={()=>{ navigator.clipboard && navigator.clipboard.writeText(conn.appWebhookUrl); }} style={{ ...btn("rgba(255,255,255,.07)",true), flexShrink:0 }}>Copy</button>
                        )}
                      </div>
                      <div style={{ fontSize:9, color:"#f59e0b", marginTop:5, display:"flex", alignItems:"center", gap:5 }}>
                        <span>⚠</span> Leave blank now — enter the URL after deploying your application.
                      </div>
                    </div>
                    <SecretField label="Webhook Signing Secret" stateKey="appWebhookSecret" placeholder="Used to verify incoming payloads" note="Generate a strong random secret and store it securely."/>
                    <div style={{ padding:"10px 14px", background:"rgba(167,139,250,.06)", borderRadius:10, border:"1px solid rgba(167,139,250,.15)" }}>
                      <div style={{ fontSize:9, fontWeight:900, color:"#a78bfa", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:6 }}>Supported Events</div>
                      <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                        {["payment.success","payment.failed","subscription.renewed","call.received","call.ended","wa.message.received"].map(e=>(
                          <span key={e} style={{ fontSize:9, background:"rgba(167,139,250,.1)", color:"#a78bfa", padding:"2px 8px", borderRadius:6, fontFamily:"monospace" }}>{e}</span>
                        ))}
                      </div>
                    </div>
                    <ActionRow sectionId="appwh" connKey="appWebhook" saveLabel="Save Webhook" testLabel="Send Test Ping"/>
                  </ServiceCard>

                  {/* Virtual Number */}
                  <ServiceCard id="vnum" icon="📱" title="App Virtual Number" subtitle="Nexus-assigned number for call routing" accentColor="#fb923c" connected={!!conn.virtualNum}>
                    <Field label="Virtual Number" stateKey="virtualNum" placeholder="+91 80000 00000" type="tel" note="Assign a virtual number from your telephony provider pool. All advocate calls route through this."/>
                    <div>
                      <div style={{ fontSize:10, fontWeight:700, color:"#64748b", marginBottom:5 }}>Internal Notes</div>
                      <textarea
                        value={conn.virtualNumNote}
                        onChange={e=>setC("virtualNumNote",e.target.value)}
                        rows={2}
                        placeholder="e.g. Purchased from Exotel on 2026-03-04, batch IVR configured…"
                        style={{ ...inp, resize:"none" }}
                      />
                    </div>
                    <div style={{ display:"flex", gap:8, marginTop:6, paddingTop:16, borderTop:"1px solid rgba(255,255,255,.06)" }}>
                      <button onClick={()=>saveSection("vnum")} style={btn(C.gold,true)}>
                        {connSaved["vnum"]?"✓ Saved!":"💾 Save Number"}
                      </button>
                    </div>
                  </ServiceCard>

                </div>

              </div>

              {/* Bottom notice */}
              <div style={{ marginTop:24, padding:"14px 18px", background:"rgba(245,158,11,.05)", border:"1px solid rgba(245,158,11,.12)", borderRadius:14, display:"flex", alignItems:"flex-start", gap:12 }}>
                <span style={{ fontSize:20, flexShrink:0 }}>🔐</span>
                <div>
                  <div style={{ fontSize:12, fontWeight:700, color:C.gold, marginBottom:3 }}>Security Notice</div>
                  <div style={{ fontSize:11, color:C.muted, lineHeight:1.7 }}>
                    All API keys and secrets are AES-256 encrypted before storage. Never share credentials via email or chat.
                    Rotate secrets immediately if you suspect a breach — use the <strong style={{ color:C.text }}>Disconnect</strong> button and re-enter new credentials.
                    Webhook URLs and virtual numbers can be updated after deployment without affecting existing integrations.
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ── AI PROMPTS ── */}
        {tab==="prompts" && (
          <div style={{ display:"flex", flexDirection:"column", height:"calc(100vh - 145px)", overflow:"hidden" }}>

            {/* Page header */}
            <div style={{ flexShrink:0, marginBottom:20 }}>
              <div style={{ fontSize:9, fontWeight:900, color:"#a78bfa", letterSpacing:"0.3em", textTransform:"uppercase", marginBottom:4 }}>AI Configuration</div>
              <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between" }}>
                <h2 style={{ fontSize:36, fontWeight:900, fontStyle:"italic", letterSpacing:"-0.04em" }}>System Prompts</h2>
                <div style={{ fontSize:11, color:C.muted, textAlign:"right", lineHeight:1.6 }}>
                  These prompts define how the AI behaves in each portal.<br/>
                  <span style={{ color:"#f59e0b", fontWeight:700 }}>Changes take effect immediately on next AI session.</span>
                </div>
              </div>
            </div>

            {/* Section toggle */}
            <div style={{ display:"flex", gap:0, marginBottom:20, flexShrink:0, background:"rgba(255,255,255,.04)", borderRadius:14, padding:4, width:"fit-content", border:"1px solid rgba(255,255,255,.06)" }}>
              {[
                { id:"advocate",  icon:"⚖️",  label:"Advocate Portal AI",  sub:"LEXI — Legal Agent",       color:"#6366f1" },
                { id:"affiliate", icon:"🔗",  label:"Affiliate Portal AI",  sub:"Commission Intelligence",  color:"#fb923c" },
              ].map(s=>(
                <button key={s.id} onClick={()=>setPromptSection(s.id)} style={{ padding:"10px 28px", borderRadius:10, background:promptSection===s.id?"rgba(255,255,255,.08)":"transparent", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"flex-start", gap:2, transition:"all .15s" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                    <span style={{ fontSize:15 }}>{s.icon}</span>
                    <span style={{ fontSize:11, fontWeight:900, color:promptSection===s.id?s.color:C.muted, letterSpacing:"-0.01em" }}>{s.label}</span>
                  </div>
                  <span style={{ fontSize:9, color:"#334155", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.12em", paddingLeft:22 }}>{s.sub}</span>
                </button>
              ))}
            </div>

            {/* ADVOCATE PROMPT SECTION */}
            {promptSection==="advocate" && (
              <div style={{ flex:1, display:"flex", gap:20, overflow:"hidden" }}>

                {/* Left: info panel */}
                <div style={{ width:260, flexShrink:0, display:"flex", flexDirection:"column", gap:12, overflowY:"auto" }}>
                  <div style={{ ...card, borderColor:"rgba(99,102,241,.25)", background:"rgba(99,102,241,.05)" }}>
                    <div style={{ fontSize:9, fontWeight:900, color:"#6366f1", letterSpacing:"0.25em", textTransform:"uppercase", marginBottom:10 }}>About This Prompt</div>
                    <div style={{ fontSize:12, color:C.muted, lineHeight:1.8 }}>
                      This prompt powers <strong style={{ color:"#818cf8" }}>LEXI</strong> — the AI agent inside every advocate's portal. It governs how LEXI handles queries, drafts documents, answers calls, and interacts with clients on behalf of the advocate.
                    </div>
                  </div>

                  <div style={{ ...card }}>
                    <div style={{ fontSize:9, fontWeight:900, color:C.muted, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:12 }}>Capabilities Enabled</div>
                    {[
                      ["⚖️", "Legal Research & Citations",   "#818cf8"],
                      ["✍️", "Document Drafting (8 types)",  "#818cf8"],
                      ["📞", "Call Handling Agent",           "#10b981"],
                      ["💬", "Client Communication",          "#10b981"],
                      ["🌐", "Multilingual (EN/ML/HI)",       "#f59e0b"],
                      ["🔒", "Client Confidentiality",        "#10b981"],
                    ].map(([icon,label,color])=>(
                      <div key={label} style={{ display:"flex", alignItems:"center", gap:9, padding:"6px 0", borderBottom:"1px solid rgba(255,255,255,.04)", fontSize:11 }}>
                        <span style={{ fontSize:14 }}>{icon}</span>
                        <span style={{ color:C.text, flex:1 }}>{label}</span>
                        <span style={{ width:7, height:7, borderRadius:"50%", background:color, flexShrink:0 }}/>
                      </div>
                    ))}
                  </div>

                  <div style={{ ...card, background:"rgba(245,158,11,.04)", borderColor:"rgba(245,158,11,.15)" }}>
                    <div style={{ fontSize:9, fontWeight:900, color:C.gold, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:8 }}>Key Rules Embedded</div>
                    {[
                      "Never fabricate case citations",
                      "Always caveat as legal guidance",
                      "Maintain client confidentiality",
                      "Follow Temp Instructions exactly",
                      "Respond in advocate's language",
                    ].map(r=>(
                      <div key={r} style={{ display:"flex", gap:7, padding:"4px 0", fontSize:10, color:C.muted }}>
                        <span style={{ color:"#10b981", flexShrink:0 }}>✓</span>{r}
                      </div>
                    ))}
                  </div>

                  <div style={{ ...card }}>
                    <div style={{ fontSize:9, fontWeight:900, color:C.muted, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:8 }}>Prompt Stats</div>
                    {[
                      ["Characters", advocatePrompt.length],
                      ["Lines",      advocatePrompt.split("\n").length],
                      ["Sections",   (advocatePrompt.match(/^#{2,3} /gm)||[]).length],
                    ].map(([l,v])=>(
                      <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"4px 0", fontSize:11, borderBottom:"1px solid rgba(255,255,255,.04)" }}>
                        <span style={{ color:C.muted }}>{l}</span>
                        <span style={{ fontWeight:700, color:"#818cf8" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: editor */}
                <div style={{ flex:1, display:"flex", flexDirection:"column", gap:0, overflow:"hidden", ...card, padding:0 }}>
                  {/* Editor toolbar */}
                  <div style={{ padding:"12px 16px", borderBottom:"1px solid rgba(255,255,255,.06)", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:10, height:10, borderRadius:"50%", background:"#6366f1", boxShadow:"0 0 8px #6366f1" }}/>
                      <span style={{ fontWeight:900, fontSize:13 }}>LEXI — Advocate Portal System Prompt</span>
                    </div>
                    <div style={{ display:"flex", gap:7 }}>
                      <button onClick={()=>copyPrompt("advocate")} style={{ ...btn("rgba(255,255,255,.07)",true) }}>
                        {promptCopied.advocate ? "✓ Copied!" : "📋 Copy"}
                      </button>
                      <button onClick={()=>resetPrompt("advocate")} style={{ ...btn("rgba(245,158,11,.12)",true), color:"#f59e0b" }}>↺ Reset</button>
                      <button onClick={()=>savePrompt("advocate")} style={{ ...btn("#6366f1",true) }}>
                        {promptSaved.advocate ? "✓ Saved!" : "💾 Save Prompt"}
                      </button>
                    </div>
                  </div>
                  {/* Textarea */}
                  <textarea
                    value={advocatePrompt}
                    onChange={e=>setAdvocatePrompt(e.target.value)}
                    style={{ flex:1, background:"transparent", border:"none", outline:"none", color:"#e2e8f0", fontSize:12, lineHeight:1.8, fontFamily:"'Courier New', Courier, monospace", padding:"20px 24px", resize:"none", overflowY:"auto" }}
                    spellCheck={false}
                  />
                  {/* Status bar */}
                  <div style={{ padding:"8px 16px", borderTop:"1px solid rgba(255,255,255,.06)", display:"flex", justifyContent:"space-between", flexShrink:0, background:"#070b14" }}>
                    <span style={{ fontSize:9, color:"#334155", fontFamily:"monospace" }}>advocate-portal-system-prompt.md</span>
                    <span style={{ fontSize:9, color:"#334155" }}>{advocatePrompt.length} chars · {advocatePrompt.split("\n").length} lines</span>
                  </div>
                </div>
              </div>
            )}

            {/* AFFILIATE PROMPT SECTION */}
            {promptSection==="affiliate" && (
              <div style={{ flex:1, display:"flex", gap:20, overflow:"hidden" }}>

                {/* Left: info panel */}
                <div style={{ width:260, flexShrink:0, display:"flex", flexDirection:"column", gap:12, overflowY:"auto" }}>
                  <div style={{ ...card, borderColor:"rgba(251,146,60,.25)", background:"rgba(251,146,60,.04)" }}>
                    <div style={{ fontSize:9, fontWeight:900, color:"#fb923c", letterSpacing:"0.25em", textTransform:"uppercase", marginBottom:10 }}>About This Prompt</div>
                    <div style={{ fontSize:12, color:C.muted, lineHeight:1.8 }}>
                      This prompt governs the <strong style={{ color:"#fb923c" }}>Affiliate Intelligence System</strong> — the AI that helps affiliates understand their earnings, subscriber status, and commission rules.
                    </div>
                  </div>

                  <div style={{ ...card, borderColor:"rgba(251,146,60,.15)", background:"rgba(251,146,60,.03)" }}>
                    <div style={{ fontSize:9, fontWeight:900, color:"#fb923c", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:12 }}>Commission Rules (Hardcoded)</div>
                    {[
                      ["Rate",           "20% of first payment only",    "#fb923c"],
                      ["Type",           "One-time, non-recurring",       "#f59e0b"],
                      ["Payout Date",    "4th of every month",            "#10b981"],
                      ["Sub Renewal",    "Every 31 days from join date",  "#818cf8"],
                      ["Eligibility",    "Only on first payment cleared", "#10b981"],
                      ["Clawback",       "On refund — next payout cycle", "#ef4444"],
                    ].map(([l,v,c])=>(
                      <div key={l} style={{ padding:"6px 0", borderBottom:"1px solid rgba(255,255,255,.04)" }}>
                        <div style={{ fontSize:9, color:"#475569", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:2 }}>{l}</div>
                        <div style={{ fontSize:11, fontWeight:700, color:c }}>{v}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ ...card }}>
                    <div style={{ fontSize:9, fontWeight:900, color:C.muted, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:8 }}>AI Can Answer</div>
                    {[
                      "\"When do I get paid?\"",
                      "\"Which subscribers are overdue?\"",
                      "\"How much will I earn on April 4?\"",
                      "\"Show my commission breakdown\"",
                      "\"Why is subscriber X not counted?\"",
                    ].map(q=>(
                      <div key={q} style={{ fontSize:10, color:C.muted, padding:"5px 0", borderBottom:"1px solid rgba(255,255,255,.04)", display:"flex", gap:6 }}>
                        <span style={{ color:"#fb923c" }}>›</span>{q}
                      </div>
                    ))}
                  </div>

                  <div style={{ ...card }}>
                    <div style={{ fontSize:9, fontWeight:900, color:C.muted, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:8 }}>Prompt Stats</div>
                    {[
                      ["Characters", affiliatePrompt.length],
                      ["Lines",      affiliatePrompt.split("\n").length],
                      ["Sections",   (affiliatePrompt.match(/^#{2,3} /gm)||[]).length],
                    ].map(([l,v])=>(
                      <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"4px 0", fontSize:11, borderBottom:"1px solid rgba(255,255,255,.04)" }}>
                        <span style={{ color:C.muted }}>{l}</span>
                        <span style={{ fontWeight:700, color:"#fb923c" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: editor */}
                <div style={{ flex:1, display:"flex", flexDirection:"column", gap:0, overflow:"hidden", ...card, padding:0 }}>
                  {/* Editor toolbar */}
                  <div style={{ padding:"12px 16px", borderBottom:"1px solid rgba(255,255,255,.06)", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:10, height:10, borderRadius:"50%", background:"#fb923c", boxShadow:"0 0 8px #fb923c" }}/>
                      <span style={{ fontWeight:900, fontSize:13 }}>Affiliate Intelligence — System Prompt</span>
                    </div>
                    <div style={{ display:"flex", gap:7 }}>
                      <button onClick={()=>copyPrompt("affiliate")} style={{ ...btn("rgba(255,255,255,.07)",true) }}>
                        {promptCopied.affiliate ? "✓ Copied!" : "📋 Copy"}
                      </button>
                      <button onClick={()=>resetPrompt("affiliate")} style={{ ...btn("rgba(245,158,11,.12)",true), color:"#f59e0b" }}>↺ Reset</button>
                      <button onClick={()=>savePrompt("affiliate")} style={{ ...btn("#fb923c",true) }}>
                        {promptSaved.affiliate ? "✓ Saved!" : "💾 Save Prompt"}
                      </button>
                    </div>
                  </div>
                  {/* Textarea */}
                  <textarea
                    value={affiliatePrompt}
                    onChange={e=>setAffiliatePrompt(e.target.value)}
                    style={{ flex:1, background:"transparent", border:"none", outline:"none", color:"#e2e8f0", fontSize:12, lineHeight:1.8, fontFamily:"'Courier New', Courier, monospace", padding:"20px 24px", resize:"none", overflowY:"auto" }}
                    spellCheck={false}
                  />
                  {/* Status bar */}
                  <div style={{ padding:"8px 16px", borderTop:"1px solid rgba(255,255,255,.06)", display:"flex", justifyContent:"space-between", flexShrink:0, background:"#070b14" }}>
                    <span style={{ fontSize:9, color:"#334155", fontFamily:"monospace" }}>affiliate-portal-system-prompt.md</span>
                    <span style={{ fontSize:9, color:"#334155" }}>{affiliatePrompt.length} chars · {affiliatePrompt.split("\n").length} lines</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* ── ADD ADVOCATE MODAL ── */}
      {showAddModal && (
        <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setShowAddModal(false)}>
          <div style={{ ...card, width:560, maxHeight:"85vh", overflowY:"auto", borderRadius:24 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <div>
                <div style={{ fontSize:9, fontWeight:900, color:C.gold, letterSpacing:"0.25em", textTransform:"uppercase", marginBottom:4 }}>New Advocate</div>
                <h3 style={{ fontSize:22, fontWeight:900, fontStyle:"italic", margin:0 }}>Add to Registry</h3>
              </div>
              <button onClick={()=>setShowAddModal(false)} style={{ background:"none", border:"none", color:C.muted, fontSize:20, cursor:"pointer", padding:"4px 8px" }}>✕</button>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              {[["Full Name","name","text"],["Email","email","email"],["Phone","phone","tel"],["Bar Council ID","barCouncil","text"]].map(([lbl,field,type])=>(
                <div key={field}>
                  <div style={{ fontSize:10, fontWeight:700, color:"#64748b", marginBottom:4 }}>{lbl}</div>
                  <input type={type} value={newAdv[field]||""} onChange={e=>setNewAdv(n=>({...n,[field]:e.target.value}))} placeholder={lbl} style={inp} />
                </div>
              ))}

              <div>
                <div style={{ fontSize:10, fontWeight:700, color:"#64748b", marginBottom:4 }}>Specialization</div>
                <select value={newAdv.spec} onChange={e=>setNewAdv(n=>({...n,spec:e.target.value}))} style={{ ...inp, cursor:"pointer" }}>
                  {["Civil Law","Criminal Law","Family Law","Corporate Law","Constitutional Law","Labour Law","Property Law","IPR","Cyber Law","Taxation"].map(s=><option key={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <div style={{ fontSize:10, fontWeight:700, color:"#64748b", marginBottom:4 }}>Plan</div>
                <select value={newAdv.plan} onChange={e=>setNewAdv(n=>({...n,plan:e.target.value}))} style={{ ...inp, cursor:"pointer" }}>
                  {["Starter","Pro","Elite"].map(p=><option key={p}>{p}</option>)}
                </select>
              </div>
            </div>

            {/* Location pickers in modal */}
            <div style={{ marginTop:16, padding:"14px 16px", background:"rgba(245,158,11,.05)", border:"1px solid rgba(245,158,11,.15)", borderRadius:12 }}>
              <div style={{ fontSize:9, fontWeight:900, color:C.gold, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:12 }}>📍 Location (State / District / Sub District)</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
                <div>
                  <div style={{ fontSize:9, fontWeight:700, color:"#64748b", marginBottom:4 }}>State</div>
                  <select value={addState} onChange={e=>{ setAddState(e.target.value); setAddDistrict(""); setAddSubDist(""); }} style={{ ...inp, cursor:"pointer" }}>
                    <option value="">{locationLoading?"Loading…":"Select State"}</option>
                    {states.map(s=><option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{ fontSize:9, fontWeight:700, color:"#64748b", marginBottom:4 }}>District</div>
                  <select value={addDistrict} onChange={e=>{ setAddDistrict(e.target.value); setAddSubDist(""); }} style={{ ...inp, cursor:"pointer", opacity:!addState?0.45:1 }} disabled={!addState}>
                    <option value="">{addState?"Select District":"Select State first"}</option>
                    {addDistricts.map(d=><option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{ fontSize:9, fontWeight:700, color:"#64748b", marginBottom:4 }}>Sub District</div>
                  <select value={addSubDist} onChange={e=>setAddSubDist(e.target.value)} style={{ ...inp, cursor:"pointer", opacity:!addDistrict?0.45:1 }} disabled={!addDistrict}>
                    <option value="">{addDistrict?"Select Sub District":"Select District first"}</option>
                    {addSubDistricts.map(s=><option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              {addState && (
                <div style={{ marginTop:8, display:"flex", gap:6, flexWrap:"wrap" }}>
                  {addState && <span style={{ padding:"2px 8px", background:"rgba(245,158,11,.12)", borderRadius:20, fontSize:9, color:C.gold, fontWeight:700 }}>📍 {addState}</span>}
                  {addDistrict && <span style={{ padding:"2px 8px", background:"rgba(99,102,241,.12)", borderRadius:20, fontSize:9, color:"#818cf8", fontWeight:700 }}>🏛 {addDistrict}</span>}
                  {addSubDist && <span style={{ padding:"2px 8px", background:"rgba(16,185,129,.1)", borderRadius:20, fontSize:9, color:"#10b981", fontWeight:700 }}>📌 {addSubDist}</span>}
                </div>
              )}
            </div>

            <div style={{ display:"flex", gap:10, marginTop:20 }}>
              <button onClick={saveNewAdv} disabled={!newAdv.name||!newAdv.email} style={{ ...btn(), opacity:!newAdv.name||!newAdv.email?0.5:1 }}>Save Advocate</button>
              <button onClick={()=>setShowAddModal(false)} style={btn("rgba(255,255,255,.07)")}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
