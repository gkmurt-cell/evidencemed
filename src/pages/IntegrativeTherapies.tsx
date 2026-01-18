import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { RightSidebar } from "@/components/layout/RightSidebar";
import EducationalDisclaimer from "@/components/layout/EducationalDisclaimer";
import { 
  Zap, 
  Leaf, 
  Hand, 
  Pill, 
  Brain, 
  Heart,
  Waves,
  ExternalLink,
  BookOpen,
  FileText,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Tree visualization categories
const therapyCategories = [
  { id: "energetic", name: "Energetic", icon: Zap, color: "bg-violet-500", description: "Energy-based healing modalities" },
  { id: "herbal", name: "Herbal", icon: Leaf, color: "bg-emerald-500", description: "Plant-based remedies" },
  { id: "bodywork", name: "Bodywork", icon: Hand, color: "bg-amber-500", description: "Physical manipulation therapies" },
  { id: "vitamins", name: "Vitamins", icon: Pill, color: "bg-blue-500", description: "Nutritional supplementation" },
  { id: "repurposed", name: "Repurposed Drugs", icon: Heart, color: "bg-rose-500", description: "Off-label pharmaceutical uses" },
  { id: "psychotherapy", name: "Psychotherapy", icon: Brain, color: "bg-teal-500", description: "Mind-body approaches" },
];

// Modalities list with detailed descriptions
const modalities = [
  {
    name: "Accelerated Resolution Therapy (ART)",
    description: "An evidence-based psychotherapy developed in 2008 that combines rapid eye movements with image rescripting to help clients process trauma in 1-5 sessions. Uses voluntary image replacement (VIR) to help clients replace distressing traumatic images with positive ones while retaining factual memory.",
    category: "psychotherapy",
    link: "https://holistichealthcommunity.org/healing-modalities/art-accelerated-resolution-therapy"
  },
  {
    name: "Acupuncture",
    description: "A 3,500 year old healing art from China using ultra-fine, sterile needles to unblock areas where Qi (energy) has become blocked. It boosts the body's Qi and bodily fluids when depleted, and re-establishes their smooth and healthy flow through specific acupuncture points on energy channels.",
    category: "energetic",
    link: "https://holistichealthcommunity.org/healing-modalities/acupuncture"
  },
  {
    name: "Akashic Records",
    description: "A fifth dimensional information mega-library that catalogs every choice our souls have ever made. The wisdom contained in this cosmic database can help understand how to change circumstances and create the lives we truly want to live, understanding patterns of choice we've been engaging.",
    category: "energetic",
    link: "https://holistichealthcommunity.org/healing-modalities/akashic-records"
  },
  {
    name: "Alexander Technique",
    description: "A process of self-discovery that allows coordination of mind and body to re-learn movement. Classes teach students to become aware of their own movement tendencies, how to release unnecessary tension, and how to consciously make new choices to create more flow and ease of movement.",
    category: "bodywork",
    link: "https://holistichealthcommunity.org/healing-modalities/alexander-technique"
  },
  {
    name: "Art Therapy",
    description: "Assists individuals in creating art as a visualization and meditation tool — to direct and focus thoughts, goals and feelings into the desired direction. No prior artistic skills needed. Uses flowing artistic colors, mixed media, and eclectic materials to create meaningful items aligned with personal goals.",
    category: "psychotherapy",
    link: "https://holistichealthcommunity.org/healing-modalities/art-therapy"
  },
  {
    name: "Auricular Acupuncture",
    description: "Also known as Ear Acupuncture, an ancient treatment with extensive research supporting its effect. A deeply relaxing and safe treatment applied to specific points on the ear. Highly effective for stress, anxiety, and feelings of well-being by stimulating the body's natural endorphins.",
    category: "energetic",
    link: "https://holistichealthcommunity.org/healing-modalities/auricular-acupuncture"
  },
  {
    name: "Ayurveda",
    description: "Ancient Indian system of medicine emphasizing balance between body, mind, and spirit through diet, herbal treatments, and lifestyle practices.",
    category: "herbal",
    link: "/ayurveda",
    isInternalLink: true
  },
  {
    name: "Biophoton Therapy (Biontology)",
    description: "Uses the Chiren® instrument developed by Johan Boswinkel to measure where biophotons are emitting chaotic light. The instrument inverts your biophotons to neutralize any disturbing signals, allowing the body to restore its own self-healing system.",
    category: "energetic",
    link: "https://holistichealthcommunity.org/healing-modalities/biophoton-therapy-biontology"
  },
  {
    name: "Brennan Healing Science",
    description: "An enlightening system combining hands-on healing techniques with spiritual and psychological processes. Developed by Dr. Barbara Brennan, former NASA physicist, this four-year trained practice touches every aspect of life and works with the human energy field for transformation.",
    category: "energetic",
    link: "https://holistichealthcommunity.org/healing-modalities/brennan-healing-science"
  },
  {
    name: "Bowen Technique",
    description: "A gentle, non-invasive bodywork therapy that uses subtle rolling movements over muscles, tendons, ligaments, and fascia to stimulate the body's self-healing mechanisms and reset the autonomic nervous system.",
    category: "energetic",
    link: "https://holistichealthcommunity.org/healing-modalities/bowen-technique"
  },
  {
    name: "Chiropractic",
    description: "A healthcare discipline emphasizing the body's instinctive power to heal itself without drugs or surgery. Focuses on diagnosis, treatment, and prevention of mechanical disorders of the musculoskeletal system and their effects on the nervous system through manual treatments including spinal adjustment.",
    category: "bodywork",
    link: "https://holistichealthcommunity.org/healing-modalities/chiropractic"
  },
  {
    name: "Colon Hydrotherapy",
    description: "A therapeutic procedure involving flushing the colon with warm, purified water to remove waste and toxins. Promotes digestive health, improves bowel functions, and enhances overall well-being. Assists with conditions like constipation, bloating, and fatigue.",
    category: "bodywork",
    link: "https://holistichealthcommunity.org/healing-modalities/colon-hydrotherapy"
  },
  {
    name: "Craniosacral Therapy",
    description: "Gently works with the spine, skull, cranial sutures, diaphragms, and fascia to ease restrictions of nerve passages and harmonize cerebrospinal fluid movement. Helps realign musculoskeletal structures and alleviates headaches, TMJ, fibromyalgia, and mental stress.",
    category: "bodywork",
    link: "https://holistichealthcommunity.org/healing-modalities/craniosacral-therapy"
  },
  {
    name: "Energetic Chiropractic",
    description: "Addresses the accumulated stress factors that limit our ability to adapt successfully. Works with muscle contraction, holds, imbalance and other compromises to well-being caused by excessive stress through energetic approaches to spinal care.",
    category: "energetic",
    link: "https://holistichealthcommunity.org/healing-modalities/energetic-chiropractic"
  },
  {
    name: "Feldenkrais",
    description: "Named after Dr. Moshe Feldenkrais, a physicist and judo expert who developed therapeutic movement after a knee injury. Uses somatic education with movement and real-time body awareness to stimulate neuroplasticity and create new neural pathways for optimal movement patterns.",
    category: "bodywork",
    link: "https://holistichealthcommunity.org/healing-modalities/feldenkrais"
  },
  {
    name: "Flower Essence Therapy",
    description: "Vibrational plant medicine that supports positive shifts and changes, bringing greater health, happiness and well-being. Sessions explore current challenges and growth areas, then create special flower essence formulas to support your unique healing journey.",
    category: "herbal",
    link: "https://holistichealthcommunity.org/healing-modalities/flower-essence-therapy"
  },
  {
    name: "Health Coaching",
    description: "Uses a combination of current health metrics, genetics, testing, detoxification, energy work, and mind-body healing to create a roadmap for health unique to each client. Specializes in chronic illness, Lyme, thyroid issues, and cancer prevention.",
    category: "psychotherapy",
    link: "https://holistichealthcommunity.org/healing-modalities/health-coaching"
  },
  {
    name: "Herbal Health Consultation",
    description: "Examines how lifestyle, diet and thought patterns affect health, then discovers which plant allies can support the natural process of healing. Addresses sleep, energy, anxiety, digestion, brain function through herbal remedies and natural approaches.",
    category: "herbal",
    link: "https://holistichealthcommunity.org/healing-modalities/herbal-health-consultation"
  },
  {
    name: "Holistic Medicine",
    description: "A form of healing that considers the whole person — body, mind, spirit, and emotions — in the quest for optimal health and wellness. May use all forms of health care, from conventional medication to alternative therapies.",
    category: "herbal",
    link: "https://holistichealthcommunity.org/healing-modalities/holistic-medicine"
  },
  {
    name: "Holistic Optometry",
    description: "Treats the cause of visual problems rather than just symptoms. Through exercises and activities, patients strengthen their visual system to address difficulty concentrating, headaches, double vision, and attention problems for improved visual functioning.",
    category: "bodywork",
    link: "https://holistichealthcommunity.org/healing-modalities/holistic-optometry"
  },
  {
    name: "Homeopathic Inquiry",
    description: "Part of Integral Homeopathics in-take process focusing on particular symptoms or states of mind, following the expression from its beginning. Helps understand what symptoms are expressing on a deeper level.",
    category: "herbal",
    link: "https://holistichealthcommunity.org/healing-modalities/homeopathy"
  },
  {
    name: "Hypnotherapy/Past Life Regression",
    description: "Accesses deeper consciousness levels where memories are stored without time boundaries. Past life memories can affect present experiences, and this therapy helps process and integrate these influences for current healing and transformation.",
    category: "psychotherapy",
    link: "https://holistichealthcommunity.org/healing-modalities/hypnotherapypast-life-regression-therapy"
  },
  {
    name: "IET: Integrated Energy Therapy",
    description: "Reconnects the mind, body, and soul to restore natural equilibrium. With the aid of healing angels, therapists channel universal divine energy to remove obstructions and repair the crucial internal life force that powers our bodies, emotions, and existence.",
    category: "energetic",
    link: "https://holistichealthcommunity.org/healing-modalities/iet-integrated-energy-therapy"
  },
  {
    name: "Jin Shin Jyutsu",
    description: "An ancient oriental Art of harmonizing life energy within the body, said to predate Buddha and Moses. Rediscovered in the early 1900's by Master Jiro Murai. A physio-philosophy using application of hands for gently balancing the flow of life energy.",
    category: "energetic",
    link: "https://holistichealthcommunity.org/healing-modalities/jin-shin-jyutsu"
  },
  {
    name: "Jyorei",
    description: "A spiritual healing practice meaning 'purification of the spirit'. Founded by Meishusama (Mokichi Okada), it focuses spiritual light on impurities or clouds within the spiritual world, dissolving them to relieve physical, emotional and personal distress.",
    category: "energetic",
    link: "https://holistichealthcommunity.org/healing-modalities/jyorei"
  },
  {
    name: "Lightfield",
    description: "Science-based technologies from the Lightfield Foundation that allow you to enter an effortless, instant state of quiet and meditation. Helps relax body and mind so you can start creating the life you want through remote sessions.",
    category: "energetic",
    link: "https://holistichealthcommunity.org/healing-modalities/lightfield"
  },
  {
    name: "Marma Therapy",
    description: "An ancient Ayurvedic practice from India working with 117 Marma points connected to different energy pathways. Similar to Acupuncture but without needles, using pressure, vibration and herbal oils to open blocked energy pathways.",
    category: "energetic",
    link: "https://holistichealthcommunity.org/healing-modalities/marma-therapy"
  },
  {
    name: "Massage",
    description: "A method of manipulating soft tissues for restoration of function and release of tension. Holistically affects all body systems — muscular, skeletal, digestive, elimination, respiratory, circulatory, lymphatic, endocrine, emotional, mental, and nervous systems.",
    category: "bodywork",
    link: "https://holistichealthcommunity.org/healing-modalities/massage"
  },
  {
    name: "Matrix Energetics",
    description: "A 'Consciousness Technology' developed by Dr. Richard Bartlett, rooted in quantum physics. Helps bypass habitual limited perceptions to access the Zero Point Field — the field of pure potential and realm of all possibility at the subatomic level.",
    category: "energetic",
    link: "https://holistichealthcommunity.org/healing-modalities/matrix-energetics"
  },
  {
    name: "MediSounds®",
    description: "Based on the Tree of Life from the Kabbalah. The energies (Sefirot) constitute our human makeup and are a blueprint for the energies of this world. Understanding and using these powers improves physical, emotional, and spiritual circumstances.",
    category: "energetic",
    link: "https://holistichealthcommunity.org/healing-modalities/medisounds%C2%AE"
  },
  {
    name: "One Light Healing Touch",
    description: "A safe, non-invasive healing intervention caring for the whole person — body, mind and spirit. Induces changes in the human energy system affecting physical, emotional, mental and spiritual health and well-being.",
    category: "energetic",
    link: "https://holistichealthcommunity.org/healing-modalities/one-light-healing-touch"
  },
  {
    name: "Psychotherapy/Art Therapy",
    description: "Helps clients with a broad spectrum of mental and emotional difficulties. Eliminates or manages difficulties to help clients live better lives, increase well-being and healing through therapeutic conversation and creative expression.",
    category: "psychotherapy",
    link: "https://holistichealthcommunity.org/healing-modalities/psychotherapy-art-therapy"
  },
  {
    name: "Reconnective Healing",
    description: "Developed by Dr. Eric Pearl, this new form of healing reconnects us to the fullness of the universe and ourselves at the highest levels. Works through a new bandwidth of light and information for deep, permanent healing and transformation.",
    category: "energetic",
    link: "https://holistichealthcommunity.org/healing-modalities/reconnective-healing"
  },
  {
    name: "Reflexology",
    description: "A natural healing art based on the principle that reflex points on the feet and hands correspond to every body part. Pressure application on particular areas serves to relax tension, improve circulation and promote natural function of related body areas.",
    category: "bodywork",
    link: "https://holistichealthcommunity.org/healing-modalities/reflexology"
  },
  {
    name: "Reiki",
    description: "A Japanese form of light touch healing that moves energy blocks and nourishes the whole being. Useful for stress reduction, releasing energy stagnation, enhancing immune function, physical healing and mental clarity. Simple, gentle, and complements other modalities.",
    category: "energetic",
    link: "https://holistichealthcommunity.org/healing-modalities/reiki"
  },
  {
    name: "Rubenfeld Synergy®",
    description: "A holistic fusion of touch, talk, and compassionate listening fostering connection between body, mind, emotions and spirit. Based on awareness of body messages through curious inquiry, with little experiments of movement or imagery for self-discovery.",
    category: "bodywork",
    link: "https://holistichealthcommunity.org/healing-modalities/rubenfeld-synergy%C2%AE"
  },
  {
    name: "Soma Veda Thai Yoga",
    description: "An ancient comprehensive healing art from Thailand bringing balance to body, mind and spirit. The practitioner moves the receiver into yoga-based poses while they remain relaxed, using pressure, energy, attention and breath to open energy channels.",
    category: "bodywork",
    link: "https://holistichealthcommunity.org/healing-modalities/soma-veda-thai-yoga"
  },
  {
    name: "Spinal Balancing",
    description: "Blends Applied Kinesiology with other modalities for dynamic functional neuro-muscular examination and treatment. Uses muscle testing and balancing techniques to assess and treat musculoskeletal and visceral organ systems.",
    category: "bodywork",
    link: "https://holistichealthcommunity.org/healing-modalities/spinal-balancing"
  },
  {
    name: "Thai Massage",
    description: "Traditional healing combining acupressure, Indian Ayurvedic principles, and assisted yoga postures. For thousands of years used to treat ailments and maintain wellness through acupressure, stretching, conscious breathing, range of motion, and energy work.",
    category: "bodywork",
    link: "https://holistichealthcommunity.org/healing-modalities/thai-massage"
  },
  {
    name: "Thai Yoga Bodywork",
    description: "A gentle form of assisted yoga consisting of postural release, stretching, rhythmic rocking along energy lines and pressure points, focused breathing, meditation, and somatic movement re-patterning for whole body-mind healing.",
    category: "bodywork",
    link: "https://holistichealthcommunity.org/healing-modalities/thai-yoga-bodywork"
  },
  {
    name: "Vibrational Attunement: Tuning Forks",
    description: "Like adjusting a piano, tuning forks can achieve optimal physical, emotional, mental, and spiritual balance. Biosonics tuning forks tuned to sacred proportions affect the body almost instantaneously, altering biochemistry to bring the body back to its fundamental pulse.",
    category: "energetic",
    link: "https://holistichealthcommunity.org/healing-modalities/vibrational-attunement-tuning-forks-for-human-tuning"
  },
  {
    name: "Yoga Therapy",
    description: "Uses yoga postures, breathing exercises, meditation, and guided imagery to improve mental and physical health. The holistic focus encourages integration of mind, body, and spirit for comprehensive wellness.",
    category: "bodywork",
    link: "https://holistichealthcommunity.org/healing-modalities/yoga-therapy"
  },
  {
    name: "Sai Vibrionics",
    description: "A spiritual healing system based on the teachings of Sri Sathya Sai Baba using vibrational remedies. Practitioners use specialized equipment to prepare potentized remedies that address physical, mental, emotional, and spiritual imbalances through divine healing energy.",
    category: "energetic",
    link: "https://www.vibrionics.org"
  },
  {
    name: "Chinese Medicine",
    description: "A comprehensive medical system developed over 2,500 years including acupuncture, herbal medicine, dietary therapy, Tui Na massage, and Qigong. Based on balancing Yin and Yang, promoting Qi flow through meridians, and the Five Element theory for diagnosis and treatment.",
    category: "herbal",
    link: "https://nccih.nih.gov/health/chinesemedicine"
  },
  {
    name: "Essential Oils & Aromatherapy",
    description: "Therapeutic use of concentrated plant extracts for physical and emotional wellness. Essential oils are used through inhalation, topical application, and diffusion to support immune function, reduce stress, and promote healing through the olfactory system and skin absorption.",
    category: "herbal",
    link: "https://nccih.nih.gov/health/aromatherapy"
  },
];

// Energetic treatments list
const energeticTreatments = [
  {
    name: "Rife Therapy",
    description: "Uses specific electromagnetic frequencies to target pathogens. Developed by Royal Raymond Rife in the 1930s, modern devices emit frequencies believed to resonate with and destroy harmful microorganisms.",
    implementation: "Sessions typically last 30-60 minutes using a Rife machine that emits programmed frequencies through plasma tubes or handheld electrodes.",
    studies: 3,
    tags: ["frequency", "electromagnetic", "non-invasive"],
  },
  {
    name: "Bio-Frequency Devices",
    description: "Electronic devices that emit specific frequencies to support cellular health and balance the body's bioelectric field. Includes PEMF (Pulsed Electromagnetic Field) therapy devices.",
    implementation: "Daily sessions of 15-30 minutes using mats, pads, or localized applicators. Frequency programs vary based on condition.",
    studies: 12,
    tags: ["PEMF", "cellular", "electromagnetic"],
  },
  {
    name: "Med Beds",
    description: "Advanced healing technology combining multiple modalities including frequency therapy, plasma energy, and quantum healing principles for whole-body regeneration.",
    implementation: "Sessions in specialized facilities with trained practitioners. Duration varies from 30 minutes to several hours.",
    studies: 0,
    tags: ["emerging", "regenerative", "quantum"],
  },
  {
    name: "Reiki",
    description: "Japanese energy healing technique where practitioners channel universal life force energy through their hands to promote healing and balance in the recipient's energy field.",
    implementation: "Sessions last 45-90 minutes. Recipient lies clothed on a table while practitioner places hands on or near the body.",
    studies: 28,
    tags: ["hands-on", "japanese", "spiritual"],
  },
  {
    name: "Kinesiology",
    description: "Uses muscle testing to identify imbalances in the body's structural, chemical, and emotional systems. Applied kinesiology helps determine appropriate treatments.",
    implementation: "Practitioner tests muscle response to various stimuli to identify issues and guide treatment protocols.",
    studies: 15,
    tags: ["muscle-testing", "diagnostic", "holistic"],
  },
  {
    name: "Quantum Bio-Energetics",
    description: "Combines quantum physics principles with bioenergetic medicine to address health at the subatomic level, working with the body's quantum field.",
    implementation: "Sessions may include device-assisted scanning and treatment, meditation, and practitioner-guided protocols.",
    studies: 4,
    tags: ["quantum", "bioenergetic", "advanced"],
  },
  {
    name: "Field Work",
    description: "Works with the body's electromagnetic and morphogenetic fields to restore coherence and promote healing through various energetic techniques.",
    implementation: "Practitioner uses various techniques to assess and balance the body's energy fields, often combining multiple modalities.",
    studies: 6,
    tags: ["morphogenetic", "coherence", "holistic"],
  },
  {
    name: "TFT (Thought Field Therapy)",
    description: "Tapping therapy that targets specific meridian points while focusing on traumatic memories or negative emotions to resolve psychological disturbances.",
    implementation: "Client focuses on issue while practitioner guides them through specific tapping sequences on acupressure points.",
    studies: 18,
    tags: ["tapping", "meridian", "psychological"],
  },
  {
    name: "Matrix Energetics",
    description: "Consciousness-based healing system that uses light touch and focused intent to collapse limiting belief patterns and transform the body's energy matrix.",
    implementation: "Practitioner uses two-point technique and intention to shift client's energy state. Sessions are typically 30-60 minutes.",
    studies: 2,
    tags: ["consciousness", "transformation", "two-point"],
  },
  {
    name: "Spinal Flow",
    description: "Gentle technique working with the spine and nervous system to release stored tension and trauma, promoting natural healing responses.",
    implementation: "Light touches along the spine help identify and release blockages. Regular sessions recommended for best results.",
    studies: 5,
    tags: ["spinal", "gentle", "nervous-system"],
  },
  {
    name: "Acupuncture",
    description: "Ancient Chinese medicine practice inserting thin needles at specific points along meridians to balance qi (life force) and promote healing.",
    implementation: "Licensed practitioner inserts sterile needles at strategic points. Sessions last 30-60 minutes with needles in place for 15-30 minutes.",
    studies: 450,
    tags: ["traditional", "meridian", "needle"],
  },
  {
    name: "Bowen Technique",
    description: "A gentle, non-invasive bodywork therapy that uses subtle rolling movements over muscles, tendons, ligaments, and fascia to stimulate the body's self-healing mechanisms and reset the autonomic nervous system.",
    implementation: "Practitioner makes precise rolling moves at specific points on the body with rest periods between sequences. Sessions typically last 45-60 minutes, with clients remaining clothed.",
    studies: 22,
    tags: ["gentle", "fascia", "nervous-system"],
  },
];

// Herbal treatments list
const herbalTreatments = [
  {
    name: "Ayurveda",
    description: "Ancient Indian system of medicine emphasizing balance between body, mind, and spirit through diet, herbal treatments, and lifestyle practices. Categorizes individuals by doshas (Vata, Pitta, Kapha) to personalize treatment.",
    implementation: "Initial consultation determines constitution and imbalances. Treatment includes herbal formulations, dietary changes, daily routines, and cleansing protocols (Panchakarma).",
    studies: 156,
    tags: ["traditional", "holistic", "dosha-based"],
  },
  {
    name: "Traditional Chinese Herbalism",
    description: "Complex system using combinations of herbs in formulas tailored to individual patterns of disharmony. Herbs are categorized by temperature, taste, and organ meridian to create balanced prescriptions.",
    implementation: "Practitioner diagnoses through pulse and tongue examination. Custom formulas are prepared as decoctions, powders, or pills, typically taken 2-3 times daily.",
    studies: 320,
    tags: ["traditional", "formula-based", "TCM"],
  },
  {
    name: "Western Herbalism",
    description: "Plant-based healing tradition using single herbs or simple combinations. Emphasizes gentle, whole-plant preparations that work with the body's natural healing processes.",
    implementation: "Herbalist assesses symptoms and constitution. Treatments may include tinctures, teas, capsules, or topical preparations. Often combined with dietary recommendations.",
    studies: 89,
    tags: ["western", "gentle", "whole-plant"],
  },
  {
    name: "Flower Essence Therapy",
    description: "Vibrational remedies prepared from flower essences to address emotional and spiritual imbalances. Developed by Dr. Edward Bach, these work on subtle energy levels to shift consciousness.",
    implementation: "Practitioner selects essences based on emotional states. Drops are taken under the tongue or in water, typically 4 drops 4 times daily for several weeks.",
    studies: 12,
    tags: ["vibrational", "emotional", "Bach"],
  },
  {
    name: "Aromatherapy",
    description: "Therapeutic use of essential oils extracted from plants for physical and psychological well-being. Oils can be inhaled, applied topically, or used in baths to affect mood, reduce pain, and promote healing.",
    implementation: "Essential oils selected for specific concerns are used in diffusers, massage oils, or added to baths. Sessions with practitioners may include full-body massage with custom blends.",
    studies: 178,
    tags: ["essential-oils", "aromatic", "topical"],
  },
  {
    name: "Homeopathy",
    description: "System based on 'like cures like' using highly diluted substances to trigger the body's natural healing response. Remedies are matched to the totality of symptoms including mental and emotional states.",
    implementation: "Detailed case-taking identifies the simillimum (most similar remedy). Pellets or liquid doses are taken according to potency and sensitivity, with careful observation of response.",
    studies: 142,
    tags: ["dilution", "vital-force", "individualized"],
  },
  {
    name: "Adaptogenic Herbs",
    description: "Category of herbs that help the body adapt to stress and restore balance. Includes ashwagandha, rhodiola, ginseng, and holy basil. These normalize physiological functions and enhance resilience.",
    implementation: "Daily supplementation with appropriate adaptogens based on constitution and stress patterns. Typically taken for 4-12 weeks with cycling periods.",
    studies: 234,
    tags: ["stress", "adaptogen", "resilience"],
  },
  {
    name: "Medicinal Mushrooms",
    description: "Fungi with therapeutic properties including immune modulation, cognitive enhancement, and anti-cancer effects. Includes reishi, lion's mane, chaga, cordyceps, and turkey tail.",
    implementation: "Extracts or powders taken daily as supplements, teas, or added to foods. Quality sourcing and dual extraction (water and alcohol) methods are important for efficacy.",
    studies: 287,
    tags: ["fungi", "immune", "nootropic"],
  },
];

// Bodywork treatments list
const bodyworkTreatments = [
  {
    name: "Massage Therapy",
    description: "Systematic manipulation of soft tissues to enhance function, promote relaxation, and reduce muscle tension. Various techniques include Swedish, deep tissue, sports massage, and trigger point therapy.",
    implementation: "Sessions range from 30-90 minutes. Client lies on massage table while therapist uses hands, forearms, or elbows to work muscles and connective tissue.",
    studies: 425,
    tags: ["manual", "relaxation", "therapeutic"],
  },
  {
    name: "Chiropractic",
    description: "Healthcare discipline focusing on musculoskeletal disorders, particularly spine-related issues. Uses manual adjustments to restore proper alignment and improve nervous system function.",
    implementation: "Initial assessment includes posture analysis and imaging if needed. Adjustments are targeted to misaligned vertebrae, often with complementary soft tissue work.",
    studies: 380,
    tags: ["spinal", "adjustment", "nervous-system"],
  },
  {
    name: "Craniosacral Therapy",
    description: "Gentle technique working with the craniosacral system—membranes and cerebrospinal fluid surrounding brain and spinal cord. Uses light touch to detect and release restrictions.",
    implementation: "Practitioner applies subtle pressure (5 grams or less) to skull, spine, and sacrum. Sessions are deeply relaxing and typically last 45-60 minutes.",
    studies: 67,
    tags: ["gentle", "cranial", "cerebrospinal"],
  },
  {
    name: "Alexander Technique",
    description: "Educational method teaching improved posture and movement habits. Helps release unconscious patterns of tension that cause pain and limit performance in daily activities.",
    implementation: "One-on-one lessons where teacher guides student through everyday movements, using gentle hands-on guidance and verbal instruction. Typically 30-45 minute sessions.",
    studies: 45,
    tags: ["posture", "movement", "education"],
  },
  {
    name: "Feldenkrais Method",
    description: "Movement-based approach developing awareness through movement to improve flexibility, coordination, and self-image. Named after physicist Dr. Moshe Feldenkrais.",
    implementation: "Awareness Through Movement (ATM) group classes or individual Functional Integration sessions. Uses gentle, exploratory movements to create new neural pathways.",
    studies: 38,
    tags: ["awareness", "neuroplasticity", "somatic"],
  },
  {
    name: "Reflexology",
    description: "Therapeutic technique applying pressure to specific points on feet, hands, and ears that correspond to organs and body systems. Promotes relaxation and supports natural healing.",
    implementation: "Practitioner works reflex points primarily on the feet in sessions lasting 45-60 minutes. Regular sessions recommended for chronic conditions.",
    studies: 52,
    tags: ["feet", "reflex-points", "relaxation"],
  },
  {
    name: "Rolfing/Structural Integration",
    description: "Deep tissue manipulation reorganizing the body's connective tissue (fascia) to restore natural alignment and balance. Developed by Dr. Ida Rolf.",
    implementation: "Traditional 10-session series progressively addresses different body segments. Sessions involve deep, slow pressure to release fascial restrictions.",
    studies: 28,
    tags: ["fascia", "deep-tissue", "alignment"],
  },
  {
    name: "Thai Massage",
    description: "Ancient healing system combining acupressure, Indian Ayurvedic principles, and assisted yoga postures. Performed on floor mat with client fully clothed.",
    implementation: "Sessions last 60-120 minutes. Practitioner uses thumbs, palms, elbows, knees, and feet to apply pressure along energy lines while moving client through stretches.",
    studies: 73,
    tags: ["stretching", "energy-lines", "floor-based"],
  },
  {
    name: "Myofascial Release",
    description: "Technique applying sustained pressure to myofascial connective tissue restrictions. Addresses chronic pain, improves range of motion, and releases emotional holding patterns.",
    implementation: "Therapist applies gentle sustained pressure into restrictions, waiting for tissue to release. No oils are used to allow proper grip on tissue.",
    studies: 89,
    tags: ["fascia", "sustained-pressure", "chronic-pain"],
  },
  {
    name: "Yoga Therapy",
    description: "Therapeutic application of yoga practices customized to individual health conditions. Integrates physical postures, breathing techniques, and meditation for healing.",
    implementation: "One-on-one sessions assess needs and create personalized practice. Home practice is assigned and refined over multiple sessions. Often 60-90 minute sessions.",
    studies: 312,
    tags: ["yoga", "personalized", "mind-body"],
  },
];

const IntegrativeTherapies = () => {
  const [isModalitiesOpen, setIsModalitiesOpen] = useState(false);
  const [selectedModality, setSelectedModality] = useState<string | null>(null);

  const handleModalityClick = (modality: string) => {
    setSelectedModality(selectedModality === modality ? null : modality);
  };

  const getModalityData = (name: string) => {
    return modalities.find(m => m.name === name);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      energetic: "border-l-violet-500",
      herbal: "border-l-emerald-500",
      bodywork: "border-l-amber-500",
      psychotherapy: "border-l-teal-500",
      vitamins: "border-l-blue-500",
      repurposed: "border-l-rose-500",
    };
    return colors[category] || "border-l-primary";
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      energetic: "Energetic",
      herbal: "Herbal",
      bodywork: "Bodywork",
      psychotherapy: "Mind-Body",
      vitamins: "Vitamins",
      repurposed: "Repurposed",
    };
    return labels[category] || category;
  };

  return (
    <>
      <Helmet>
        <title>Alternative Medicine & Integrative Therapies | EvidenceMed - Complementary Therapy Research</title>
        <meta 
          name="description" 
          content="Explore alternative medicine including energetic treatments, herbal medicine, bodywork, and alternative cancer treatments. Evidence-based research on complementary and alternative medicine modalities like Rife, Reiki, Acupuncture." 
        />
        <meta name="keywords" content="alternative medicine, alternative therapy, complementary and alternative medicine, alternative cancer treatments, integrative therapies, Rife therapy, Reiki, acupuncture, energy healing, PEMF" />
        <link rel="canonical" href="https://evidencemed.com/integrative-therapies" />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="pt-16 lg:pt-20">
          {/* Hero Section */}
          <section className="py-12 lg:py-20 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  Alternative Medicine & Integrative Therapies
                </span>
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
                  Explore Alternative Medicine & Therapy
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
                  Explore research summaries on complementary and alternative medicine modalities. 
                  From traditional practices to emerging approaches—evidence presented for educational purposes.
                </p>
                <p className="text-sm text-muted-foreground/80 max-w-2xl mx-auto flex items-center justify-center gap-2 mb-6">
                  <BookOpen className="h-4 w-4 shrink-0" />
                  Stanford University maintains an integrative medicine research arm within its 
                  research and development sciences, reflecting growing academic interest in this field.
                </p>
                <EducationalDisclaimer />
              </div>
            </div>
          </section>

          {/* Modalities Collapsible Tile */}
          <section className="py-6 lg:py-8">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="bg-card border border-border rounded-xl shadow-lg overflow-hidden">
                  {/* Collapsible Header */}
                  <button
                    onClick={() => setIsModalitiesOpen(!isModalitiesOpen)}
                    className="w-full flex items-center justify-between p-5 hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground">
                          Modalities
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {modalities.length} integrative healing practices
                        </p>
                      </div>
                    </div>
                    {isModalitiesOpen ? (
                      <ChevronUp className="w-6 h-6 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-muted-foreground" />
                    )}
                  </button>

                  {/* Collapsible Content */}
                  {isModalitiesOpen && (
                    <div className="border-t border-border">
                      <ScrollArea className="h-96">
                        <div className="p-4 space-y-2">
                          {modalities.map((modality) => (
                            <div key={modality.name}>
                              <button
                                onClick={() => handleModalityClick(modality.name)}
                                className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                                  selectedModality === modality.name
                                    ? 'bg-primary/10 border-primary/30 shadow-md'
                                    : 'bg-secondary/30 border-border hover:bg-secondary/50 hover:border-primary/20'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-foreground">{modality.name}</span>
                                  <span className={`text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground`}>
                                    {getCategoryLabel(modality.category)}
                                  </span>
                                </div>
                              </button>
                              {selectedModality === modality.name && (
                                <div className={`mt-2 ml-4 p-4 bg-secondary/20 rounded-lg border-l-4 ${getCategoryColor(modality.category)}`}>
                                  <p className="text-sm text-foreground leading-relaxed mb-3">
                                    {modality.description}
                                  </p>
                                  {modality.isInternalLink ? (
                                    <Link 
                                      to={modality.link}
                                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium"
                                    >
                                      Explore Ayurveda <ExternalLink className="w-3 h-3" />
                                    </Link>
                                  ) : (
                                    <a 
                                      href={modality.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium"
                                    >
                                      Learn more & find practitioners <ExternalLink className="w-3 h-3" />
                                    </a>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Tree Visualization Section */}
          <section className="py-6 lg:py-8">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground text-center mb-12">
                  Types of Integrative Medicine
                </h2>
                
                {/* Static Tree Diagram */}
                <div className="relative">
                  {/* Central Node */}
                  <div className="flex justify-center mb-8">
                    <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center shadow-lg">
                      <div className="text-center text-primary-foreground">
                        <Waves className="w-8 h-8 mx-auto mb-1" />
                        <span className="text-xs font-medium">Integrative<br/>Medicine</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Connecting Lines SVG */}
                  <svg className="absolute top-32 left-1/2 -translate-x-1/2 w-full max-w-4xl h-24 pointer-events-none" viewBox="0 0 800 100">
                    <path d="M400 0 L100 90" stroke="currentColor" strokeWidth="2" fill="none" className="text-border" />
                    <path d="M400 0 L233 90" stroke="currentColor" strokeWidth="2" fill="none" className="text-border" />
                    <path d="M400 0 L366 90" stroke="currentColor" strokeWidth="2" fill="none" className="text-border" />
                    <path d="M400 0 L433 90" stroke="currentColor" strokeWidth="2" fill="none" className="text-border" />
                    <path d="M400 0 L566 90" stroke="currentColor" strokeWidth="2" fill="none" className="text-border" />
                    <path d="M400 0 L700 90" stroke="currentColor" strokeWidth="2" fill="none" className="text-border" />
                  </svg>
                  
                  {/* Category Nodes */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-16">
                    {therapyCategories.map((category) => (
                      <a
                        key={category.id}
                        href={`#${category.id}`}
                        className="group flex flex-col items-center p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-medium transition-all"
                      >
                        <div className={`w-14 h-14 rounded-full ${category.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                          <category.icon className="w-7 h-7 text-white" />
                        </div>
                        <span className="font-medium text-foreground text-sm text-center">{category.name}</span>
                        <span className="text-xs text-muted-foreground text-center mt-1">{category.description}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Content with Sidebar */}
          <div className="flex">
            {/* Main Content */}
            <main className="flex-1 min-w-0">
              {/* Energetic Treatments Section */}
              <section id="energetic" className="py-12 lg:py-16 bg-secondary/30">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 rounded-full bg-violet-500 flex items-center justify-center">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">
                          Energetic Treatments
                        </h2>
                        <p className="text-muted-foreground">Energy-based healing modalities</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {energeticTreatments.map((treatment) => (
                        <div
                          key={treatment.name}
                          className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-medium transition-all"
                        >
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <h3 className="font-serif text-xl font-semibold text-foreground">
                              {treatment.name}
                            </h3>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                              <FileText className="w-3 h-3" />
                              {treatment.studies} studies
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground mb-4">
                            {treatment.description}
                          </p>
                          
                          <div className="bg-secondary/50 rounded-lg p-4 mb-4">
                            <h4 className="text-sm font-medium text-foreground mb-2">Implementation</h4>
                            <p className="text-sm text-muted-foreground">
                              {treatment.implementation}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {treatment.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Herbal Medicine Section */}
              <section id="herbal" className="py-12 lg:py-16">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center">
                        <Leaf className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">
                          Herbal Medicine
                        </h2>
                        <p className="text-muted-foreground">Plant-based remedies and natural therapies</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {herbalTreatments.map((treatment) => (
                        <div
                          key={treatment.name}
                          className="p-6 rounded-xl bg-card border border-border hover:border-emerald-500/30 hover:shadow-medium transition-all"
                        >
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <h3 className="font-serif text-xl font-semibold text-foreground">
                              {treatment.name}
                            </h3>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                              <FileText className="w-3 h-3" />
                              {treatment.studies} studies
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground mb-4">
                            {treatment.description}
                          </p>
                          
                          <div className="bg-emerald-500/10 rounded-lg p-4 mb-4">
                            <h4 className="text-sm font-medium text-foreground mb-2">Implementation</h4>
                            <p className="text-sm text-muted-foreground">
                              {treatment.implementation}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {treatment.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Bodywork Therapies Section */}
              <section id="bodywork" className="py-12 lg:py-16 bg-secondary/30">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center">
                        <Hand className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">
                          Bodywork Therapies
                        </h2>
                        <p className="text-muted-foreground">Physical manipulation and movement therapies</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {bodyworkTreatments.map((treatment) => (
                        <div
                          key={treatment.name}
                          className="p-6 rounded-xl bg-card border border-border hover:border-amber-500/30 hover:shadow-medium transition-all"
                        >
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <h3 className="font-serif text-xl font-semibold text-foreground">
                              {treatment.name}
                            </h3>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                              <FileText className="w-3 h-3" />
                              {treatment.studies} studies
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground mb-4">
                            {treatment.description}
                          </p>
                          
                          <div className="bg-amber-500/10 rounded-lg p-4 mb-4">
                            <h4 className="text-sm font-medium text-foreground mb-2">Implementation</h4>
                            <p className="text-sm text-muted-foreground">
                              {treatment.implementation}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {treatment.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 text-xs rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Resources Section */}
              <section className="py-12 lg:py-16 bg-primary/5">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl">
                    <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground text-center mb-8">
                      Research Resources
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                      <a
                        href="https://www.ncbi.nlm.nih.gov/pmc/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-medium transition-all group"
                      >
                        <ExternalLink className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                        <h3 className="font-medium text-foreground mb-2">PubMed Central</h3>
                        <p className="text-sm text-muted-foreground">Free access to biomedical and life sciences research articles.</p>
                      </a>
                      <a
                        href="https://nccih.nih.gov/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-medium transition-all group"
                      >
                        <ExternalLink className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                        <h3 className="font-medium text-foreground mb-2">NCCIH</h3>
                        <p className="text-sm text-muted-foreground">National Center for Complementary and Integrative Health research.</p>
                      </a>
                      <a
                        href="https://holistichealthcommunity.org/services"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-medium transition-all group"
                      >
                        <ExternalLink className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                        <h3 className="font-medium text-foreground mb-2">Holistic Health Community</h3>
                        <p className="text-sm text-muted-foreground">Find practitioners and detailed modality information.</p>
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </main>

            {/* Right Sidebar - Contextual for Integrative Therapies */}
            <div className="hidden lg:block sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
              <RightSidebar variant="split" relatedCategory="energetic" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default IntegrativeTherapies;
