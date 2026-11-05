import { UserProfile, DayMealPlan, DayWorkout } from '../types';

export const INITIAL_PROFILE: UserProfile = {
  name: 'Fitness Explorer',
  gender: 'Pria',
  age: 23,
  height: 176,
  weight: 70.0,
  waist: 78.0,
  bmi: 22.6,
  bmr: 1685,
  maintenanceCalories: 2575,
  targetCalories: 2200,
  targetProtein: 140, // Range 130-150g
  targetCarbs: 255,   // Range 240-270g
  targetFat: 68,      // Range 60-75g
  targetFiber: 30,    // Range 25-35g
  targetWater: 2.5,   // Range 2-3 L
  targetSteps: 9000,  // Range 8,000-10,000
  targetSleep: 8.0,   // Range 7-9 hours
  activityLevel: 'Moderately active (Cukup aktif)',
  equipment: 'No equipment (Bodyweight only)',
};

export const MEAL_PLANS: DayMealPlan[] = [
  {
    day: 1,
    title: 'Hari 1 - High Energy Kickoff',
    breakfast: {
      id: 'd1_b',
      name: 'Oats + Susu, Pisang, & 2 Telur Rebus',
      calories: 460,
      protein: 28,
      carbs: 62,
      fat: 12,
      fiber: 8,
      description: 'Oatmeal hangat dimasak dengan susu skim/low-fat, topping potongan buah pisang matang, dan 2 butir telur rebus utuh.',
      cookingTip: 'Gunakan telur rebus tanpa minyak untuk kalori yang lebih bersih.'
    },
    lunch: {
      id: 'd1_l',
      name: 'Nasi, Ayam Panggang, Tumis Sayur, & Tempe',
      calories: 640,
      protein: 48,
      carbs: 68,
      fat: 18,
      fiber: 7,
      description: 'Nasi putih (1 centong sedang), dada ayam panggang bumbu rempah nusantara, tempe bacem atau bakar, serta sayuran brokoli/wortel.',
      cookingTip: 'Dada ayam dioles sedikit minyak lalu dipanggang di teflon antilengket.'
    },
    snack: {
      id: 'd1_s',
      name: 'Greek Yogurt Plain / Susu + Buah Apel / Pepaya',
      calories: 230,
      protein: 15,
      carbs: 32,
      fat: 4,
      fiber: 4,
      description: 'Greek yogurt tanpa pemanis buatan disajikan dengan potongan buah segar lokal.',
      cookingTip: 'Bisa tambahkan sejumput kayu manis bubuk untuk aroma lezat alami.'
    },
    dinner: {
      id: 'd1_d',
      name: 'Ikan Bakar Teflon, Nasi, Tahu Kukus, & Sayuran',
      calories: 550,
      protein: 45,
      carbs: 58,
      fat: 14,
      fiber: 6,
      description: 'Ikan kembung/nila bakar bumbu kecap jeruk nipis, nasi putih hangat, tahu putih kukus berbumbu, dan lalapan timun/sayur rebus.',
      cookingTip: 'Ikan laut kaya akan Omega-3 yang sangat bagus menjaga kesehatan jantung dan metabolisme.'
    }
  },
  {
    day: 2,
    title: 'Hari 2 - Lean & Light Carb',
    breakfast: {
      id: 'd2_b',
      name: 'Omelet 3 Telur, Roti Gandum Utuh, & Buah Jeruk',
      calories: 470,
      protein: 31,
      carbs: 45,
      fat: 17,
      fiber: 6,
      description: 'Omelet dengan 2 putih + 1 utuh (atau 3 butir) isi tomat & bayam, 2 lembar roti gandum panggang, dan jeruk manis.',
      cookingTip: 'Gunakan spray cooking oil atau wajan antilengket berapi kecil.'
    },
    lunch: {
      id: 'd2_l',
      name: 'Nasi, Ayam Suwir Gurih, & Sup Sayuran Bening Segar',
      calories: 610,
      protein: 44,
      carbs: 72,
      fat: 14,
      fiber: 8,
      description: 'Semangkuk sup sayur bening (wortel, kentang sedikit, buncis, seledri) kaya serat dengan suwiran dada ayam empuk dan nasi.',
      cookingTip: 'Kuah sup bening membantu rasa kenyang lebih lama tanpa menambah banyak kalori.'
    },
    snack: {
      id: 'd2_s',
      name: 'Susu UHT Low-Fat / Plain Yogurt + 1 Buah Pisang',
      calories: 220,
      protein: 11,
      carbs: 38,
      fat: 3,
      fiber: 3,
      description: 'Kombinasi karbohidrat cepat serap dan protein untuk recovery energi di sore hari.',
      cookingTip: 'Konsumsi sebelum sesi jalan cepat untuk energi optimal.'
    },
    dinner: {
      id: 'd2_d',
      name: 'Ikan Tuna / Tenggiri Panggang, Kentang Rebus, & Sayur Bayam',
      calories: 560,
      protein: 46,
      carbs: 55,
      fat: 15,
      fiber: 7,
      description: 'Steak tuna/tenggiri peras jeruk nipis, 1 kentang rebus ukuran sedang dengan taburan parsley, dan sayur bening bayam jagung.',
      cookingTip: 'Kentang rebus memiliki satiety index (indeks rasa kenyang) tertinggi di antara karbohidrat lainnya.'
    }
  },
  {
    day: 3,
    title: 'Hari 3 - Local Power Protein',
    breakfast: {
      id: 'd3_b',
      name: 'Oats Hangat + Plain Yogurt + Buah Mangga / Pisang',
      calories: 440,
      protein: 22,
      carbs: 68,
      fat: 8,
      fiber: 8,
      description: 'Bubur oat lembut dipadukan dengan yogurt dingin dan potongan buah segar manis alami.',
      cookingTip: 'Bisa disiapkan semalam sebelumnya (Overnight Oats) di kulkas.'
    },
    lunch: {
      id: 'd3_l',
      name: 'Nasi, Ayam Ungkep Panggang, Tempe Goreng Sedikit Minyak, Lalapan',
      calories: 650,
      protein: 47,
      carbs: 70,
      fat: 18,
      fiber: 8,
      description: 'Ayam ungkep bumbu kuning teflon, 2 potong tempe panggang, timun, selada, daun kemangi, dan sambal tomat terasi minim minyak.',
      cookingTip: 'Lalapan mentah memberi enzim pencernaan dan serat alami yang padat.'
    },
    snack: {
      id: 'd3_s',
      name: '2 Telur Rebus Matang + 1 Buah Apel Fuji Renyah',
      calories: 235,
      protein: 14,
      carbs: 23,
      fat: 10,
      fiber: 4,
      description: 'Camilan praktis tinggi protein dan serat pektin penahan lapar.',
      cookingTip: 'Taburi sedikit garam laut dan lada hitam pada telur rebus.'
    },
    dinner: {
      id: 'd3_d',
      name: 'Ikan Laut Masak Pindang, Nasi / Kentang, & Tumis Buncis Jagung',
      calories: 550,
      protein: 43,
      carbs: 60,
      fat: 14,
      fiber: 7,
      description: 'Pindang ikan segar kuah asam segar berempah, karbohidrat pilihan, dan buncis tumis bawang putih harum.',
      cookingTip: 'Bumbu rempah kunyit dan jahe memiliki efek anti-inflamasi alami untuk otot.'
    }
  },
  {
    day: 4,
    title: 'Hari 4 - Mid-Week Recovery',
    breakfast: {
      id: 'd4_b',
      name: 'Egg Sandwich Gandum (2 Telur + Selada Tomat) + Segelas Susu',
      calories: 470,
      protein: 29,
      carbs: 48,
      fat: 16,
      fiber: 6,
      description: '2 tangkup roti gandum isi telur rebus hancur dengan sendok mustard/light mayo, selada, dan segelas susu.',
      cookingTip: 'Gunakan mustard atau lada untuk perasa lezat tanpa menambah lemak jenuh.'
    },
    lunch: {
      id: 'd4_l',
      name: 'Soto Ayam Kuah Bening, Nasi Sedang, & Ekstra Suwiran Dada Ayam/Telur',
      calories: 630,
      protein: 48,
      carbs: 67,
      fat: 17,
      fiber: 5,
      description: 'Semangkuk soto ayam hangat kaya tauge, bihun sedikit, kaldu bening gurih, ekstra 1 butir telur rebus dan dada ayam.',
      cookingTip: 'Hindari santan; kaldu ayam bening rempah sereh jeruk nipis jauh lebih ramah kalori.'
    },
    snack: {
      id: 'd4_s',
      name: 'Yogurt Rendah Gula + Potongan Buah Segar (Melon/Semangka)',
      calories: 210,
      protein: 13,
      carbs: 32,
      fat: 3,
      fiber: 3,
      description: 'Snack hidrasi kaya elektrolit alami dari buah melon/semangka segar.',
      cookingTip: 'Sangat cocok untuk hari recovery aktif.'
    },
    dinner: {
      id: 'd4_d',
      name: 'Dada Ayam Grill, Nasi Putih, Tahu Bumbu Kuning, & Sayur Capcay',
      calories: 580,
      protein: 46,
      carbs: 62,
      fat: 15,
      fiber: 8,
      description: 'Capcay aneka sayur (sawi, kembang kol, wortel) dengan ayam dan tahu kukus berbumbu.',
      cookingTip: 'Capcay sayur kuah memberi volume piring yang melimpah dan mengenyangkan.'
    }
  },
  {
    day: 5,
    title: 'Hari 5 - Power & Performance',
    breakfast: {
      id: 'd5_b',
      name: 'Oats, Pisang, 1 sdm Selai Kacang (Peanut Butter), & 2 Telur',
      calories: 520,
      protein: 30,
      carbs: 60,
      fat: 18,
      fiber: 8,
      description: 'Bahan bakar penuh tenaga untuk sesi workout Upper Body & Core yang intens.',
      cookingTip: 'Pilih selai kacang murni 100% tanpa minyak sawit tambahan dan tanpa gula tinggi.'
    },
    lunch: {
      id: 'd5_l',
      name: 'Nasi, Oseng Daging Sapi Tanpa Lemak, & Sayuran Kukus',
      calories: 650,
      protein: 48,
      carbs: 64,
      fat: 19,
      fiber: 7,
      description: 'Daging sapi has dalam (tenderloin/sirloin lean) ditumis cabai hijau minim minyak, nasi putih, dan brokoli kukus.',
      cookingTip: 'Daging sapi kaya zat besi dan creatine alami untuk performa kontraksi otot.'
    },
    snack: {
      id: 'd5_s',
      name: 'Susu Cokelat Rendah Lemak / Susu Skim + Jeruk Manis',
      calories: 220,
      protein: 12,
      carbs: 35,
      fat: 3,
      fiber: 3,
      description: 'Kombinasi rasio karbohidrat-protein ideal untuk memulihkan cadangan glikogen.',
      cookingTip: 'Minum 30 menit setelah menyelesaikan latihan tubuh bagian atas.'
    },
    dinner: {
      id: 'd5_d',
      name: 'Ikan Bakar Sambal Matah, Ubi Jalar Manis Kukus, Sayur, & Tempe',
      calories: 560,
      protein: 43,
      carbs: 58,
      fat: 16,
      fiber: 8,
      description: 'Ikan laut panggang disiram irisan bawang merah dan serai segar (sambal matah minyak kelapa 1 sdt), ubi rebus, sayur kukus.',
      cookingTip: 'Ubi jalar kaya beta-karoten dan memiliki indeks glikemik rendah-sedang.'
    }
  },
  {
    day: 6,
    title: 'Hari 6 - Weekend Fuel',
    breakfast: {
      id: 'd6_b',
      name: '3 Butir Telur Orak-Arik, Roti Gandum Panggang, & Buah Pepaya',
      calories: 480,
      protein: 30,
      carbs: 48,
      fat: 17,
      fiber: 7,
      description: 'Scrambled eggs lembut, 2 potong roti gandum hangat, dan semangkuk potongan buah pepaya segar peras jeruk nipis.',
      cookingTip: 'Pepaya mengandung enzim papain yang sangat baik melancarkan pencernaan.'
    },
    lunch: {
      id: 'd6_l',
      name: 'Nasi, Dada Ayam Panggang Bumbu Rujak/Kuning, & Cah Kangkung',
      calories: 630,
      protein: 46,
      carbs: 66,
      fat: 16,
      fiber: 7,
      description: 'Ayam berbumbu rempah nusantara yang harum, nasi putih, dan tumis kangkung terasi lezat beraroma bawang.',
      cookingTip: 'Kangkung ditumis cepat dengan api besar agar renyah dan nutrisinya terjaga.'
    },
    snack: {
      id: 'd6_s',
      name: 'Greek Yogurt + Segenggam Kacang Almond / Edamame Rebus',
      calories: 250,
      protein: 16,
      carbs: 22,
      fat: 11,
      fiber: 5,
      description: 'Lemak sehat dari kacang-kacangan mendukung produksi hormon testosteron optimal.',
      cookingTip: 'Pilih kacang panggang tanpa garam berlebih.'
    },
    dinner: {
      id: 'd6_d',
      name: 'Dada Ayam Fillet Teflon / Tahu, Kentang Panggang Rosemary, Salad Segar',
      calories: 540,
      protein: 44,
      carbs: 54,
      fat: 14,
      fiber: 7,
      description: 'Ayam fillet lembut dipanggang wajan, kentang panggang harum, dan salad selada timun dengan perasan lemon.',
      cookingTip: 'Lemon dressing tanpa mayo memberi rasa segar tajam dengan 0 kalori lemak.'
    }
  },
  {
    day: 7,
    title: 'Hari 7 - Reset & Rejuvenate',
    breakfast: {
      id: 'd7_b',
      name: 'Pancake Oat Sehat (Oat + Telur + Pisang) atau Oats Yogurt + Madu',
      calories: 450,
      protein: 24,
      carbs: 65,
      fat: 10,
      fiber: 7,
      description: 'Pancake sehat dari blenderan havermut, pisang dan telur, dipanggang teflon dan diberi drizzle madu murni.',
      cookingTip: 'Camilan pancake yang memanjakan lidah di hari Minggu tanpa merusak defisit kalori.'
    },
    lunch: {
      id: 'd7_l',
      name: 'Ikan Kakap / Gurame Bakar Kecap Jeruk Nipis, Nasi, Sayur Asem',
      calories: 620,
      protein: 45,
      carbs: 68,
      fat: 15,
      fiber: 8,
      description: 'Ikan bakar segar renyah gurih, kuah sayur asem yang asam pedas menyegarkan, labu siam, kacang panjang dan nasi.',
      cookingTip: 'Sayur asem kuah bening adalah hidangan rendah kalori yang luar biasa kaya vitamin.'
    },
    snack: {
      id: 'd7_s',
      name: 'Semangkuk Edamame Rebus Hangat atau Susu Segar + Buah',
      calories: 220,
      protein: 16,
      carbs: 24,
      fat: 6,
      fiber: 6,
      description: 'Edamame adalah sumber protein nabati lengkap dengan 9 asam amino esensial.',
      cookingTip: 'Rebus edamame dengan sedikit garam selama 5-7 menit saja.'
    },
    dinner: {
      id: 'd7_d',
      name: 'Dada Ayam Suwir, Tahu & Tempe Bacem Panggang, Nasi, Sayur Lalap',
      calories: 570,
      protein: 45,
      carbs: 60,
      fat: 14,
      fiber: 7,
      description: 'Menu penutup minggu yang seimbang dan nikmat khas rumahan Indonesia.',
      cookingTip: 'Persiapkan wadah makan (meal prep) untuk minggu berikutnya saat santai malam ini.'
    }
  }
];

export const WORKOUT_PLANS: DayWorkout[] = [
  {
    day: 1,
    title: 'Hari 1 — Full Body',
    focus: 'Aktivasi seluruh otot tubuh utama & pembakaran kalori',
    type: 'workout',
    warmupMinutes: 6,
    estimatedMinutes: 35,
    description: 'Awali minggu dengan latihan calisthenics seluruh tubuh. Jaga repetisi dengan sisa 1-3 repetisi cadangan (RIR: 1-3). Istirahat 60-90 detik antar set.',
    exercises: [
      {
        id: 'd1_ex1',
        name: 'Push-ups',
        category: 'Full Body',
        sets: 3,
        repsTarget: '6–12 repetisi',
        restSeconds: 90,
        notes: 'Jika belum sanggup lurus, gunakan variasi knee push-up (lutut di lantai) atau incline di dinding/kursi kokoh. Jaga core tetap kencang.'
      },
      {
        id: 'd1_ex2',
        name: 'Bodyweight Squats',
        category: 'Full Body',
        sets: 3,
        repsTarget: '12–20 repetisi',
        restSeconds: 75,
        notes: 'Buka kaki selebar bahu. Turun hingga paha sejajar lantai. Dada tetap tegak dan berat bertumpu pada tengah hingga tumit kaki.'
      },
      {
        id: 'd1_ex3',
        name: 'Reverse Lunges',
        category: 'Full Body',
        sets: 3,
        repsTarget: '8–12 per kaki',
        restSeconds: 75,
        notes: 'Langkah kaki ke belakang, turunkan lutut mendekati lantai perlahan. Lebih aman untuk sendi lutut dibanding forward lunge.'
      },
      {
        id: 'd1_ex4',
        name: 'Glute Bridges',
        category: 'Full Body',
        sets: 3,
        repsTarget: '12–20 repetisi',
        restSeconds: 60,
        notes: 'Berbaring telentang, tekuk lutut. Dorong pinggul ke atas menggunakan bokong (glutes), tahan 1 detik di puncak kontraksi.'
      },
      {
        id: 'd1_ex5',
        name: 'Plank Hold',
        category: 'Core',
        sets: 3,
        repsTarget: '20–45 detik',
        isTimed: true,
        durationSeconds: 35,
        restSeconds: 60,
        notes: 'Tahan tubuh dalam satu garis lurus dari kepala hingga tumit. Kencangkan perut dan jangan biarkan pinggang melengkung turun.'
      }
    ]
  },
  {
    day: 2,
    title: 'Hari 2 — Easy Cardio & Active Fat Burn',
    focus: 'Kardio zona pembakaran lemak (Zone 2) & mobilitas sendi',
    type: 'cardio',
    warmupMinutes: 3,
    estimatedMinutes: 40,
    description: 'Jalan cepat santai di luar ruangan atau treadmill. Jaga ritme bicara tetap nyaman (conversational pace).',
    exercises: [
      {
        id: 'd2_ex1',
        name: 'Brisk Walk (Jalan Cepat)',
        category: 'Cardio',
        sets: 1,
        repsTarget: '30–45 menit',
        isTimed: true,
        durationSeconds: 2100, // 35 min
        restSeconds: 0,
        notes: 'Kecepatan jalan di mana kamu masih bisa berbicara satu kalimat utuh tanpa tersengal-sengal parah. Bakar lemak tanpa menguras sistem saraf.'
      },
      {
        id: 'd2_ex2',
        name: 'Gentle Mobility & Hip Openers',
        category: 'Recovery',
        sets: 1,
        repsTarget: '5–10 menit',
        isTimed: true,
        durationSeconds: 420,
        restSeconds: 0,
        notes: 'Peregangan dinamis: putaran bahu, peregangan panggul (hip circles), dan pergelangan kaki.'
      }
    ]
  },
  {
    day: 3,
    title: 'Hari 3 — Lower Body + Core',
    focus: 'Kekuatan paha, bokong, betis, dan stabilitas panggul',
    type: 'workout',
    warmupMinutes: 6,
    estimatedMinutes: 38,
    description: 'Latihan intensitas terkontrol untuk kaki dan otot perut dalam. Gunakan tempo lambat agar kontraksi maksimal tanpa beban tambahan.',
    exercises: [
      {
        id: 'd3_ex1',
        name: 'Split Squats',
        category: 'Lower',
        sets: 3,
        repsTarget: '8–12 per kaki',
        restSeconds: 75,
        notes: 'Posisikan satu kaki di depan dan satu di belakang. Boleh pegang dinding atau sandaran kursi bila butuh keseimbangan.'
      },
      {
        id: 'd3_ex2',
        name: 'Squats Tempo (3-detik fase turun)',
        category: 'Lower',
        sets: 3,
        repsTarget: '10–15 repetisi',
        restSeconds: 90,
        notes: 'Hitung dalam hati: 1.. 2.. 3.. saat menurunkan tubuh secara perlahan, lalu dorong naik dengan kuat. Menghasilkan muscle tension luar biasa!'
      },
      {
        id: 'd3_ex3',
        name: 'Single-leg Glute Bridge',
        category: 'Lower',
        sets: 2,
        repsTarget: '8–12 per kaki',
        restSeconds: 60,
        notes: 'Angkat satu kaki lurus dan dorong pinggul hanya dengan satu kaki yang menapak. Jika terlalu berat, gunakan jembatan dua kaki biasa.'
      },
      {
        id: 'd3_ex4',
        name: 'Calf Raises (Jinjit Terkontrol)',
        category: 'Lower',
        sets: 3,
        repsTarget: '15–25 repetisi',
        restSeconds: 60,
        notes: 'Jinjit setinggi mungkin di lantai datar atau tepi undakan tangga. Tahan 1 detik di atas sebelum turun perlahan.'
      },
      {
        id: 'd3_ex5',
        name: 'Dead Bug',
        category: 'Core',
        sets: 3,
        repsTarget: '8–12 per sisi',
        restSeconds: 60,
        notes: 'Telentang dengan punggung bawah menempel rapat ke lantai. Rentangkan lengan dan kaki yang berlawanan secara perlahan bergantian.'
      }
    ]
  },
  {
    day: 4,
    title: 'Hari 4 — Active Recovery',
    focus: 'Pemulihan serat otot, sirkulasi darah, dan relaksasi sistem saraf',
    type: 'recovery',
    warmupMinutes: 0,
    estimatedMinutes: 30,
    description: 'Hari pemulihan! Tidak ada latihan berat hari ini. Tujuannya memberi otot waktu memperbaiki diri sambil tetap membakar kalori basal.',
    exercises: [
      {
        id: 'd4_ex1',
        name: 'Easy Leisure Walk (Jalan Santai)',
        category: 'Recovery',
        sets: 1,
        repsTarget: '20–30 menit',
        isTimed: true,
        durationSeconds: 1500,
        restSeconds: 0,
        notes: 'Jalan santai di taman atau sekitar perumahan. Nikmati udara segar untuk menurunkan hormon kortisol stres.'
      },
      {
        id: 'd4_ex2',
        name: 'Gentle Mobility & Full Body Stretch',
        category: 'Recovery',
        sets: 1,
        repsTarget: '10–15 menit',
        isTimed: true,
        durationSeconds: 720,
        restSeconds: 0,
        notes: 'Fokus pada peregangan hamstring, fleksor pinggul, punggung bawah, dada, dan leher.'
      }
    ]
  },
  {
    day: 5,
    title: 'Hari 5 — Upper Body + Core',
    focus: 'Dada, bahu, punggung atas, dan stabilitas samping tubuh',
    type: 'workout',
    warmupMinutes: 6,
    estimatedMinutes: 38,
    description: 'Fokus melatih kekuatan tubuh bagian atas dengan bodyweight murni tanpa perlengkapan. Lakukan dengan repetisi bersih.',
    exercises: [
      {
        id: 'd5_ex1',
        name: 'Push-ups',
        category: 'Upper',
        sets: 3,
        repsTarget: '6–12 repetisi',
        restSeconds: 90,
        notes: 'Variasikan posisi tangan sedikit lebih lebar atau gunakan incline jika set sebelumnya terasa mendekati failure.'
      },
      {
        id: 'd5_ex2',
        name: 'Pike Push-ups',
        category: 'Upper',
        sets: 3,
        repsTarget: '5–10 repetisi',
        restSeconds: 90,
        notes: 'Bentuk posisi tubuh menyerupai huruf V terbalik (pinggul di atas). Fokus mendorong ke arah bahu. Lebih mudah: incline tangan di kursi.'
      },
      {
        id: 'd5_ex3',
        name: 'Prone Y-T-W Raises',
        category: 'Upper',
        sets: 2,
        repsTarget: '8 repetisi per huruf (Y, T, W)',
        restSeconds: 75,
        notes: 'Tengkurap di lantai. Bentuk lengan huruf Y lalu angkat, huruf T lalu angkat, huruf W lalu rapatkan belikat. Bagus untuk postur bahu tegap!'
      },
      {
        id: 'd5_ex4',
        name: 'Reverse Snow Angels',
        category: 'Upper',
        sets: 3,
        repsTarget: '10–15 repetisi',
        restSeconds: 60,
        notes: 'Tengkurap, putar lengan dari samping paha melingkar ke atas kepala tanpa menyentuh lantai. Gerak perlahan dan rasakan punggung atas.'
      },
      {
        id: 'd5_ex5',
        name: 'Side Plank',
        category: 'Core',
        sets: 3,
        repsTarget: '15–40 detik per sisi',
        isTimed: true,
        durationSeconds: 30,
        restSeconds: 60,
        notes: 'Bertumpu pada satu siku dan sisi kaki. Angkat pinggul hingga lurus. Kuatkan otot obliques samping pinggang.'
      }
    ]
  },
  {
    day: 6,
    title: 'Hari 6 — Cardio + Light Core',
    focus: 'Peningkatan daya tahan kardiorespirasi & penguatan postur',
    type: 'cardio',
    warmupMinutes: 4,
    estimatedMinutes: 40,
    description: 'Gabungan jalan cepat pembakar lemak di pagi/sore hari ditambah latihan kestabilan punggung dan panggul.',
    exercises: [
      {
        id: 'd6_ex1',
        name: 'Brisk Walk (Jalan Kebugaran)',
        category: 'Cardio',
        sets: 1,
        repsTarget: '30–45 menit',
        isTimed: true,
        durationSeconds: 2100,
        restSeconds: 0,
        notes: 'Ayunkankan lengan secara alami, tegakkan postur dada, jaga ritme pernapasan teratur.'
      },
      {
        id: 'd6_ex2',
        name: 'Bird Dog',
        category: 'Core',
        sets: 2,
        repsTarget: '10 repetisi per sisi',
        restSeconds: 60,
        notes: 'Posisi merangkak meja. Luruskan tangan kanan ke depan dan kaki kiri ke belakang bersamaan. Tahan 2 detik tanpa menggoyangkan panggul.'
      },
      {
        id: 'd6_ex3',
        name: 'Dead Bug',
        category: 'Core',
        sets: 2,
        repsTarget: '10 repetisi per sisi',
        restSeconds: 60,
        notes: 'Jaga tulang punggung bawah terkunci di matras/lantai. Lakukan dengan tempo terkontrol.'
      }
    ]
  },
  {
    day: 7,
    title: 'Hari 7 — Rest & Active Recovery',
    focus: 'Relaksasi mental total, persiapan minggu baru, dan tidur berkualitas',
    type: 'rest',
    warmupMinutes: 0,
    estimatedMinutes: 25,
    description: 'Selamat atas penyelesaian siklus 7 hari! Hari ini prioritaskan tidur 7-9 jam, hidrasi cukup, dan evaluasi rata-rata berat badan mingguan.',
    exercises: [
      {
        id: 'd7_ex1',
        name: 'Relaxed Leisure Walk (Opsional)',
        category: 'Recovery',
        sets: 1,
        repsTarget: '20–30 menit santai',
        isTimed: true,
        durationSeconds: 1500,
        restSeconds: 0,
        notes: 'Jalan santai tanpa target kecepatan. Murni untuk relaksasi pikiran.'
      },
      {
        id: 'd7_ex2',
        name: 'Gentle Whole Body Stretching',
        category: 'Recovery',
        sets: 1,
        repsTarget: '10 menit peregangan',
        isTimed: true,
        durationSeconds: 600,
        restSeconds: 0,
        notes: 'Peregangan seluruh tubuh untuk meredakan ketegangan otot sebelum tidur malam.'
      }
    ]
  }
];

export const GENERAL_GUIDELINES = [
  'Awali setiap sesi latihan dengan pemanasan 5–8 menit (jalan di tempat, putaran lengan, hip hinge, dan easy squats).',
  'Target intensitas: selesaikan sebagian besar set dengan sisa 1–3 repetisi cadangan (tidak sampai gagal otot ekstrem/cedera).',
  'Istirahat 60–120 detik antar set untuk memulihkan adenosin trifosfat (ATP) otot.',
  'Hentikan latihan segera jika kamu merasakan nyeri tajam pada sendi atau tulang.',
  'Timbang berat badan tepat setelah bangun tidur & buang air, sebelum makan/minum.',
  'Bandingkan RATA-RATA 7 HARI berat badan, bukan fluktuasi harian tunggal yang umumnya dipengaruhi air dan retensi garam.',
  'Ukur lingkar pinggang 1 kali seminggu pada kondisi yang sama.'
];
