export const TEACHERS = [
  {
    id: "T001",
    name: "Dr. Evelyn Reed",
    photo: "https://randomuser.me/api/portraits/women/1.jpg",
    time: "07:58 AM",
    status: 1,
    email: "evelyn.reed1001@academicos.udg.mx",
    department: "Matemáticas",
    schedule: {
      monday: [
        {
          id: "MA-101",
          subject: "Álgebra Lineal",
          startTime: "07:00",
          endTime: "09:00",
          location: "EA-01"
        },
        {
          id: "MA-102",
          subject: "Cálculo Diferencial",
          startTime: "09:15",
          endTime: "11:15",
          location: "EA-02"
        },
        {
          id: "MA-111",
          subject: "Teoría de Números",
          startTime: "11:30",
          endTime: "01:30",
          location: "EA-03"
        },
        {
          id: "MA-112",
          subject: "Matemáticas Aplicadas",
          startTime: "02:00",
          endTime: "04:00",
          location: "EA-04"
        }
      ],
      tuesday: [
        {
          id: "MA-113",
          subject: "Geometría Analítica",
          startTime: "08:00",
          endTime: "10:00",
          location: "EB-05"
        },
        {
          id: "MA-114",
          subject: "Estadística",
          startTime: "10:15",
          endTime: "12:15",
          location: "EB-06"
        },
        {
          id: "MA-115",
          subject: "Cálculo Integral",
          startTime: "01:00",
          endTime: "03:00",
          location: "EB-07"
        },
        {
          id: "MA-116",
          subject: "Matemáticas Financieras",
          startTime: "03:15",
          endTime: "05:15",
          location: "EB-08"
        }
      ],
      wednesday: [
        {
          id: "MA-117",
          subject: "Matemáticas Discretas",
          startTime: "07:00",
          endTime: "09:00",
          location: "EB-05"
        },
        {
          id: "MA-118", // Corregí el error de "EBA:" que se coló antes
          subject: "Seminario de Matemáticas",
          startTime: "09:15",
          endTime: "11:15",
          location: "EC-01"
        },
        {
          id: "MA-119",
          subject: "Teoría de Juegos",
          startTime: "11:30",
          endTime: "01:30",
          location: "EB-06"
        },
        {
          id: "MA-120",
          subject: "Optimización",
          startTime: "02:00",
          endTime: "04:00",
          location: "EB-07"
        }
      ],
      thursday: [
        {
          id: "MA-121",
          subject: "Álgebra Lineal",
          startTime: "08:00",
          endTime: "10:00",
          location: "EA-01"
        },
        {
          id: "MA-122",
          subject: "Cálculo Diferencial",
          startTime: "10:15",
          endTime: "12:15",
          location: "EA-02"
        },
        {
          id: "MA-123",
          subject: "Matemáticas para la Computación",
          startTime: "01:00",
          endTime: "03:00",
          location: "EA-03"
        },
        {
          id: "MA-124",
          subject: "Estadística Avanzada",
          startTime: "03:15",
          endTime: "05:15",
          location: "EA-04"
        }
      ],
      friday: [
        {
          id: "MA-125",
          subject: "Geometría Analítica",
          startTime: "07:00",
          endTime: "09:00",
          location: "EA-03"
        },
        {
          id: "MA-126",
          subject: "Estadística",
          startTime: "09:15",
          endTime: "11:15",
          location: "EA-04"
        },
        {
          id: "MA-127",
          subject: "Cálculo Vectorial",
          startTime: "11:30",
          endTime: "01:30",
          location: "EB-05"
        },
        {
          id: "MA-128",
          subject: "Matemáticas Discretas II",
          startTime: "02:00",
          endTime: "04:00",
          location: "EB-06"
        }
      ]
    }
  },
  {
    id: "T002",
    name: "Mr. Samuel Carter",
    photo: "https://randomuser.me/api/portraits/men/2.jpg",
    time: "08:10 AM",
    status: 2,
    email: "samuel.carter1002@academicos.udg.mx",
    department: "Lenguas",
    schedule: {
      monday: [
        {
          id: "LE-201",
          subject: "Inglés Intermedio",
          startTime: "07:00",
          endTime: "09:00",
          location: "Edificio C, Salón 301"
        },
        {
          id: "LE-202",
          subject: "Francés Básico",
          startTime: "09:15",
          endTime: "11:00",
          location: "Edificio C, Salón 302"
        }
      ],
      tuesday: [
        {
          id: "LE-203",
          subject: "Literatura Inglesa",
          startTime: "07:00",
          endTime: "09:00",
          location: "Edificio C, Salón 303"
        },
        {
          id: "LE-204",
          subject: "Conversación en Inglés",
          startTime: "09:15",
          endTime: "11:00",
          location: "Edificio C, Salón 304"
        }
      ],
      wednesday: [
        {
          id: "LE-205",
          subject: "Seminario de Traducción",
          startTime: "07:00",
          endTime: "09:00",
          location: "Sala de Traducción"
        },
        {
          id: "LE-206",
          subject: "Inglés Intermedio",
          startTime: "09:15",
          endTime: "11:00",
          location: "Edificio C, Salón 301"
        }
      ],
      thursday: [
        {
          id: "LE-207",
          subject: "Francés Básico",
          startTime: "07:00",
          endTime: "09:00",
          location: "Edificio C, Salón 302"
        },
        {
          id: "LE-208",
          subject: "Literatura Inglesa",
          startTime: "09:15",
          endTime: "11:00",
          location: "Edificio C, Salón 303"
        }
      ],
      friday: [
        {
          id: "LE-209",
          subject: "Conversación en Inglés",
          startTime: "07:00",
          endTime: "09:00",
          location: "Edificio C, Salón 304"
        },
        {
          id: "LE-210",
          subject: "Seminario de Traducción",
          startTime: "09:15",
          endTime: "11:00",
          location: "Sala de Traducción"
        }
      ]
    }
  },
  {
    "id": "T003",
    "name": "Ms. Olivia Chen",
    "photo": "https://randomuser.me/api/portraits/women/3.jpg",
    "time": "07:45 AM",
    "status": 1,
    "email": "olivia.chen1003@academicos.udg.mx",
    "department": "Ciencias",
    "schedule": {
      monday: [
        {
          id: "CI-101",
          subject: "Química General",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio A, Salón 101"
        },
        {
          id: "CI-102",
          subject: "Física I",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio A, Salón 102"
        }
      ],
      tuesday: [
        {
          id: "CI-103",
          subject: "Biología Celular",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio A, Salón 103"
        },
        {
          id: "CI-104",
          subject: "Química Orgánica",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio A, Salón 104"
        }
      ],
      wednesday: [
        {
          id: "CI-105",
          subject: "Física II",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio A, Salón 105"
        },
        {
          id: "CI-106",
          subject: "Seminario de Ciencias",
          startTime: "10:15",
          endTime: "12:15",
          location: "Sala de Seminarios"
        }
      ],
      thursday: [
        {
          id: "CI-107",
          subject: "Química General",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio A, Salón 101"
        },
        {
          id: "CI-108",
          subject: "Física I",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio A, Salón 102"
        }
      ],
      friday: [
        {
          id: "CI-109",
          subject: "Biología Celular",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio A, Salón 103"
        },
        {
          id: "CI-110",
          subject: "Química Orgánica",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio A, Salón 104"
        }
      ]
    }
  },
  {
    "id": "T004",
    "name": "Mr. Benjamin Grant",
    "photo": "https://randomuser.me/api/portraits/men/4.jpg",
    "time": null,
    "status": 3,
    "email": "benjamin.grant1004@academicos.udg.mx",
    "department": "Historia",
    "schedule": {
      monday: [
        {
          id: "HI-101",
          subject: "Historia Antigua",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio D, Salón 101"
        },
        {
          id: "HI-102",
          subject: "Historia Medieval",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio D, Salón 102"
        }
      ],
      tuesday: [
        {
          id: "HI-103",
          subject: "Historia Moderna",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio D, Salón 103"
        },
        {
          id: "HI-104",
          subject: "Historia Contemporánea",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio D, Salón 104"
        }
      ],
      wednesday: [
        {
          id: "HI-105",
          subject: "Seminario de Historia",
          startTime: "08:00",
          endTime: "10:00",
          location: "Sala de Seminarios"
        },
        {
          id: "HI-106",
          subject: "Historia Antigua",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio D, Salón 101"
        }
      ],
      thursday: [
        {
          id: "HI-107",
          subject: "Historia Medieval",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio D, Salón 102"
        },
        {
          id: "HI-108",
          subject: "Historia Moderna",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio D, Salón 103"
        }
      ],
      friday: [
        {
          id: "HI-109",
          subject: "Historia Contemporánea",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio D, Salón 104"
        },
        {
          id: "HI-110",
          subject: "Seminario de Historia",
          startTime: "10:15",
          endTime: "12:15",
          location: "Sala de Seminarios"
        }
      ]
    }
  },
  {
    "id": "T005",
    "name": "Mrs. Chloe Patel",
    "photo": "https://randomuser.me/api/portraits/women/5.jpg",
    "time": "08:02 AM",
    "status": 2,
    "email": "chloe.patel1005@academicos.udg.mx",
    "department": "Biología",
    "schedule": {
      monday: [
        {
          id: "BI-101",
          subject: "Biología General",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio E, Salón 101"
        },
        {
          id: "BI-102",
          subject: "Botánica",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio E, Salón 102"
        }
      ],
      tuesday: [
        {
          id: "BI-103",
          subject: "Zoología",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio E, Salón 103"
        },
        {
          id: "BI-104",
          subject: "Ecología",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio E, Salón 104"
        }
      ],
      wednesday: [
        {
          id: "BI-105",
          subject: "Seminario de Biología",
          startTime: "08:00",
          endTime: "10:00",
          location: "Sala de Seminarios"
        },
        {
          id: "BI-106",
          subject: "Biología General",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio E, Salón 101"
        }
      ],
      thursday: [
        {
          id: "BI-107",
          subject: "Botánica",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio E, Salón 102"
        },
        {
          id: "BI-108",
          subject: "Zoología",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio E, Salón 103"
        }
      ],
      friday: [
        {
          id: "BI-109",
          subject: "Ecología",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio E, Salón 104"
        },
        {
          id: "BI-110",
          subject: "Seminario de Biología",
          startTime: "10:15",
          endTime: "12:15",
          location: "Sala de Seminarios"
        }
      ]
    }
  },
  {
    "id": "T006",
    "name": "Mr. David Rodriguez",
    "photo": "https://randomuser.me/api/portraits/men/6.jpg",
    "time": "07:55 AM",
    "status": 1,
    "email": "david.rodriguez1006@academicos.udg.mx",
    "department": "Física",
    "schedule": {
      monday: [
        {
          id: "FIS-101",
          subject: "Mecánica Clásica",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio F, Salón 101"
        },
        {
          id: "FIS-102",
          subject: "Termodinámica",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio F, Salón 102"
        }
      ],
      tuesday: [
        {
          id: "FIS-103",
          subject: "Electromagnetismo",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio F, Salón 103"
        },
        {
          id: "FIS-104",
          subject: "Óptica",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio F, Salón 104"
        }
      ],
      wednesday: [
        {
          id: "FIS-105",
          subject: "Seminario de Física",
          startTime: "08:00",
          endTime: "10:00",
          location: "Sala de Seminarios"
        },
        {
          id: "FIS-106",
          subject: "Mecánica Clásica",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio F, Salón 101"
        }
      ],
      thursday: [
        {
          id: "FIS-107",
          subject: "Termodinámica",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio F, Salón 102"
        },
        {
          id: "FIS-108",
          subject: "Electromagnetismo",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio F, Salón 103"
        }
      ],
      friday: [
        {
          id: "FIS-109",
          subject: "Óptica",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio F, Salón 104"
        },
        {
          id: "FIS-110",
          subject: "Seminario de Física",
          startTime: "10:15",
          endTime: "12:15",
          location: "Sala de Seminarios"
        }
      ]
    }
  },
  {
    "id": "T007",
    "name": "Dr. Sophia Miller",
    "photo": "https://randomuser.me/api/portraits/women/7.jpg",
    "time": "07:59 AM",
    "status": 1,
    "email": "sophia.miller1007@academicos.udg.mx",
    "department": "Química",
    "schedule": {
      monday: [
        {
          id: "QU-101",
          subject: "Química General",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio G, Salón 101"
        },
        {
          id: "QU-102",
          subject: "Química Orgánica",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio G, Salón 102"
        }
      ],
      tuesday: [
        {
          id: "QU-103",
          subject: "Química Inorgánica",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio G, Salón 103"
        },
        {
          id: "QU-104",
          subject: "Bioquímica",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio G, Salón 104"
        }
      ],
      wednesday: [
        {
          id: "QU-105",
          subject: "Seminario de Química",
          startTime: "08:00",
          endTime: "10:00",
          location: "Sala de Seminarios"
        },
        {
          id: "QU-106",
          subject: "Química General",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio G, Salón 101"
        }
      ],
      thursday: [
        {
          id: "QU-107",
          subject: "Química Orgánica",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio G, Salón 102"
        },
        {
          id: "QU-108",
          subject: "Química Inorgánica",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio G, Salón 103"
        }
      ],
      friday: [
        {
          id: "QU-109",
          subject: "Bioquímica",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio G, Salón 104"
        },
        {
          id: "QU-110",
          subject: "Seminario de Química",
          startTime: "10:15",
          endTime: "12:15",
          location: "Sala de Seminarios"
        }
      ]
    }
  },
  {
    "id": "T008",
    "name": "Mr. Isaac Flores",
    "photo": "https://randomuser.me/api/portraits/men/8.jpg",
    "time": null,
    "status": 3,
    "email": "isaac.flores1008@academicos.udg.mx",
    "department": "Educación Física",
    "schedule": {
      monday: [
        {
          id: "EF-101",
          subject: "Entrenamiento Deportivo",
          startTime: "08:00",
          endTime: "10:00",
          location: "Gimnasio, Cancha 1"
        },
        {
          id: "EF-102",
          subject: "Nutrición Deportiva",
          startTime: "10:15",
          endTime: "12:15",
          location: "Gimnasio, Aula 101"
        }
      ],
      tuesday: [
        {
          id: "EF-103",
          subject: "Metodología del Entrenamiento",
          startTime: "08:00",
          endTime: "10:00",
          location: "Gimnasio, Cancha 2"
        },
        {
          id: "EF-104",
          subject: "Psicología Deportiva",
          startTime: "10:15",
          endTime: "12:15",
          location: "Gimnasio, Aula 102"
        }
      ],
      wednesday: [
        {
          id: "EF-105",
          subject: "Seminario de Educación Física",
          startTime: "08:00",
          endTime: "10:00",
          location: "Sala de Seminarios"
        },
        {
          id: "EF-106",
          subject: "Entrenamiento Deportivo",
          startTime: "10:15",
          endTime: "12:15",
          location: "Gimnasio, Cancha 1"
        }
      ],
      thursday: [
        {
          id: "EF-107",
          subject: "Nutrición Deportiva",
          startTime: "08:00",
          endTime: "10:00",
          location: "Gimnasio, Aula 101"
        },
        {
          id: "EF-108",
          subject: "Metodología del Entrenamiento",
          startTime: "10:15",
          endTime: "12:15",
          location: "Gimnasio, Cancha 2"
        }
      ],
      friday: [
        {
          id: "EF-109",
          subject: "Psicología Deportiva",
          startTime: "08:00",
          endTime: "10:00",
          location: "Gimnasio, Aula 102"
        },
        {
          id: "EF-110",
          subject: "Seminario de Educación Física",
          startTime: "10:15",
          endTime: "12:15",
          location: "Sala de Seminarios"
        }
      ]
    }
  },
  {
    "id": "T009",
    "name": "Ms. Ava Kim",
    "photo": "https://randomuser.me/api/portraits/women/9.jpg",
    "time": "08:15 AM",
    "status": 2,
    "email": "ava.kim1009@academicos.udg.mx",
    "department": "Música",
    "schedule": {
      monday: [
        {
          id: "MU-101",
          subject: "Teoría Musical",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio H, Salón 101"
        },
        {
          id: "MU-102",
          subject: "Historia de la Música",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio H, Salón 102"
        }
      ],
      tuesday: [
        {
          id: "MU-103",
          subject: "Práctica Vocal",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio H, Salón 103"
        },
        {
          id: "MU-104",
          subject: "Instrumentos Musicales",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio H, Salón 104"
        }
      ],
      wednesday: [
        {
          id: "MU-105",
          subject: "Seminario de Música",
          startTime: "08:00",
          endTime: "10:00",
          location: "Sala de Seminarios"
        },
        {
          id: "MU-106",
          subject: "Teoría Musical",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio H, Salón 101"
        }
      ],
      thursday: [
        {
          id: "MU-107",
          subject: "Historia de la Música",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio H, Salón 102"
        },
        {
          id: "MU-108",
          subject: "Práctica Vocal",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio H, Salón 103"
        }
      ],
      friday: [
        {
          id: "MU-109",
          subject: "Instrumentos Musicales",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio H, Salón 104"
        },
        {
          id: "MU-110",
          subject: "Seminario de Música",
          startTime: "10:15",
          endTime: "12:15",
          location: "Sala de Seminarios"
        }
      ]
    }
  },
  {
    "id": "T010",
    "name": "Mr. Jordan Hughes",
    "photo": "https://randomuser.me/api/portraits/men/10.jpg",
    "time": "07:50 AM",
    "status": 1,
    "email": "jordan.hughes1010@academicos.udg.mx",
    "department": "Artes Visuales",
    "schedule": {
      monday: [
        {
          id: "AV-101",
          subject: "Dibujo Técnico",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio I, Salón 101"
        },
        {
          id: "AV-102",
          subject: "Pintura",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio I, Salón 102"
        }
      ],
      tuesday: [
        {
          id: "AV-103",
          subject: "Escultura",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio I, Salón 103"
        },
        {
          id: "AV-104",
          subject: "Historia del Arte",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio I, Salón 104"
        }
      ],
      wednesday: [
        {
          id: "AV-105",
          subject: "Seminario de Artes Visuales",
          startTime: "08:00",
          endTime: "10:00",
          location: "Sala de Seminarios"
        },
        {
          id: "AV-106",
          subject: "Dibujo Técnico",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio I, Salón 101"
        }
      ],
      thursday: [
        {
          id: "AV-107",
          subject: "Pintura",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio I, Salón 102"
        },
        {
          id: "AV-108",
          subject: "Escultura",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio I, Salón 103"
        }
      ],
      friday: [
        {
          id: "AV-109",
          subject: "Historia del Arte",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio I, Salón 104"
        },
        {
          id: "AV-110",
          subject: "Seminario de Artes Visuales",
          startTime: "10:15",
          endTime: "12:15",
          location: "Sala de Seminarios"
        }
      ]
    }
  },
  {
    "id": "T011",
    "name": "Dr. Evelyn Reed",
    "photo": "https://randomuser.me/api/portraits/women/1.jpg",
    "time": "07:58 AM",
    "status": 1,
    "email": "evelyn.reed1011@academicos.udg.mx",
    "department": "Matemáticas",
    "schedule": {
      monday: [
        {
          id: "MA-101",
          subject: "Álgebra Lineal",
          startTime: "07:00",
          endTime: "09:00",
          location: "Edificio B, Salón 201"
        },
        {
          id: "MA-102",
          subject: "Cálculo Diferencial",
          startTime: "09:15",
          endTime: "11:00",
          location: "Edificio B, Salón 202"
        }
      ],
      tuesday: [
        {
          id: "MA-103",
          subject: "Geometría Analítica",
          startTime: "07:00",
          endTime: "09:00",
          location: "Edificio B, Salón 203"
        },
        {
          id: "MA-104",
          subject: "Estadística",
          startTime: "09:15",
          endTime: "11:00",
          location: "Edificio B, Salón 204"
        }
      ],
      wednesday: [
        {
          id: "MA-105",
          subject: "Matemáticas Discretas",
          startTime: "07:00",
          endTime: "09:00",
          location: "Edificio B, Salón 205"
        },
        {
          id: "MA-106",
          subject: "Seminario de Matemáticas",
          startTime: "09:15",
          endTime: "11:00",
          location: "Sala de Seminarios"
        }
      ],
      thursday: [
        {
          id: "MA-107",
          subject: "Álgebra Lineal",
          startTime: "07:00",
          endTime: "09:00",
          location: "Edificio B, Salón 201"
        },
        {
          id: "MA-108",
          subject: "Cálculo Diferencial",
          startTime: "09:15",
          endTime: "11:00",
          location: "Edificio B, Salón 202"
        }
      ],
      friday: [
        {
          id: "MA-109",
          subject: "Geometría Analítica",
          startTime: "07:00",
          endTime: "09:00",
          location: "Edificio B, Salón 203"
        },
        {
          id: "MA-110",
          subject: "Estadística",
          startTime: "09:15",
          endTime: "11:00",
          location: "Edificio B, Salón 204"
        }
      ]
    }
  },
  {
    "id": "T012",
    "name": "Mr. Samuel Carter",
    "photo": "https://randomuser.me/api/portraits/men/2.jpg",
    "time": "08:10 AM",
    "status": 2,
    "email": "samuel.carter1012@academicos.udg.mx",
    "department": "Lenguas",
    "schedule": {
      monday: [
        {
          id: "LE-201",
          subject: "Inglés Intermedio",
          startTime: "07:00",
          endTime: "09:00",
          location: "Edificio C, Salón 301"
        },
        {
          id: "LE-202",
          subject: "Francés Básico",
          startTime: "09:15",
          endTime: "11:00",
          location: "Edificio C, Salón 302"
        }
      ],
      tuesday: [
        {
          id: "LE-203",
          subject: "Literatura Inglesa",
          startTime: "07:00",
          endTime: "09:00",
          location: "Edificio C, Salón 303"
        },
        {
          id: "LE-204",
          subject: "Conversación en Inglés",
          startTime: "09:15",
          endTime: "11:00",
          location: "Edificio C, Salón 304"
        }
      ],
      wednesday: [
        {
          id: "LE-205",
          subject: "Seminario de Traducción",
          startTime: "07:00",
          endTime: "09:00",
          location: "Sala de Traducción"
        },
        {
          id: "LE-206",
          subject: "Inglés Intermedio",
          startTime: "09:15",
          endTime: "11:00",
          location: "Edificio C, Salón 301"
        }
      ],
      thursday: [
        {
          id: "LE-207",
          subject: "Francés Básico",
          startTime: "07:00",
          endTime: "09:00",
          location: "Edificio C, Salón 302"
        },
        {
          id: "LE-208",
          subject: "Literatura Inglesa",
          startTime: "09:15",
          endTime: "11:00",
          location: "Edificio C, Salón 303"
        }
      ],
      friday: [
        {
          id: "LE-209",
          subject: "Conversación en Inglés",
          startTime: "07:00",
          endTime: "09:00",
          location: "Edificio C, Salón 304"
        },
        {
          id: "LE-210",
          subject: "Seminario de Traducción",
          startTime: "09:15",
          endTime: "11:00",
          location: "Sala de Traducción"
        }
      ]
    }
  },
  {
    "id": "T013",
    "name": "Ms. Olivia Chen",
    "photo": "https://randomuser.me/api/portraits/women/3.jpg",
    "time": "07:45 AM",
    "status": 1,
    "email": "olivia.chen1013@academicos.udg.mx",
    "department": "Ciencias",
    "schedule": {
      monday: [
        {
          id: "CI-101",
          subject: "Química General",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio A, Salón 101"
        },
        {
          id: "CI-102",
          subject: "Física I",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio A, Salón 102"
        }
      ],
      tuesday: [
        {
          id: "CI-103",
          subject: "Biología Celular",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio A, Salón 103"
        },
        {
          id: "CI-104",
          subject: "Química Orgánica",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio A, Salón 104"
        }
      ],
      wednesday: [
        {
          id: "CI-105",
          subject: "Física II",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio A, Salón 105"
        },
        {
          id: "CI-106",
          subject: "Seminario de Ciencias",
          startTime: "10:15",
          endTime: "12:15",
          location: "Sala de Seminarios"
        }
      ],
      thursday: [
        {
          id: "CI-107",
          subject: "Química General",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio A, Salón 101"
        },
        {
          id: "CI-108",
          subject: "Física I",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio A, Salón 102"
        }
      ],
      friday: [
        {
          id: "CI-109",
          subject: "Biología Celular",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio A, Salón 103"
        },
        {
          id: "CI-110",
          subject: "Química Orgánica",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio A, Salón 104"
        }
      ]
    }
  },
  {
    "id": "T014",
    "name": "Mr. Benjamin Grant",
    "photo": "https://randomuser.me/api/portraits/men/4.jpg",
    "time": null,
    "status": 3,
    "email": "benjamin.grant1014@academicos.udg.mx",
    "department": "Historia",
    "schedule": {
      monday: [
        {
          id: "HI-101",
          subject: "Historia Antigua",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio D, Salón 101"
        },
        {
          id: "HI-102",
          subject: "Historia Medieval",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio D, Salón 102"
        }
      ],
      tuesday: [
        {
          id: "HI-103",
          subject: "Historia Moderna",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio D, Salón 103"
        },
        {
          id: "HI-104",
          subject: "Historia Contemporánea",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio D, Salón 104"
        }
      ],
      wednesday: [
        {
          id: "HI-105",
          subject: "Seminario de Historia",
          startTime: "08:00",
          endTime: "10:00",
          location: "Sala de Seminarios"
        },
        {
          id: "HI-106",
          subject: "Historia Antigua",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio D, Salón 101"
        }
      ],
      thursday: [
        {
          id: "HI-107",
          subject: "Historia Medieval",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio D, Salón 102"
        },
        {
          id: "HI-108",
          subject: "Historia Moderna",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio D, Salón 103"
        }
      ],
      friday: [
        {
          id: "HI-109",
          subject: "Historia Contemporánea",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio D, Salón 104"
        },
        {
          id: "HI-110",
          subject: "Seminario de Historia",
          startTime: "10:15",
          endTime: "12:15",
          location: "Sala de Seminarios"
        }
      ]
    }
  },
  {
    "id": "T015",
    "name": "Mrs. Chloe Patel",
    "photo": "https://randomuser.me/api/portraits/women/5.jpg",
    "time": "08:02 AM",
    "status": 2,
    "email": "chloe.patel1015@academicos.udg.mx",
    "department": "Biología",
    "schedule": {
      monday: [
        {
          id: "BI-101",
          subject: "Biología General",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio E, Salón 101"
        },
        {
          id: "BI-102",
          subject: "Botánica",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio E, Salón 102"
        }
      ],
      tuesday: [
        {
          id: "BI-103",
          subject: "Zoología",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio E, Salón 103"
        },
        {
          id: "BI-104",
          subject: "Ecología",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio E, Salón 104"
        }
      ],
      wednesday: [
        {
          id: "BI-105",
          subject: "Seminario de Biología",
          startTime: "08:00",
          endTime: "10:00",
          location: "Sala de Seminarios"
        },
        {
          id: "BI-106",
          subject: "Biología General",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio E, Salón 101"
        }
      ],
      thursday: [
        {
          id: "BI-107",
          subject: "Botánica",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio E, Salón 102"
        },
        {
          id: "BI-108",
          subject: "Zoología",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio E, Salón 103"
        }
      ],
      friday: [
        {
          id: "BI-109",
          subject: "Ecología",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio E, Salón 104"
        },
        {
          id: "BI-110",
          subject: "Seminario de Biología",
          startTime: "10:15",
          endTime: "12:15",
          location: "Sala de Seminarios"
        }
      ]
    }
  },
  {
    "id": "T016",
    "name": "Mr. David Rodriguez",
    "photo": "https://randomuser.me/api/portraits/men/6.jpg",
    "time": "07:55 AM",
    "status": 1,
    "email": "david.rodriguez1016@academicos.udg.mx",
    "department": "Física",
    "schedule": {
      monday: [
        {
          id: "FIS-101",
          subject: "Mecánica Clásica",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio F, Salón 101"
        },
        {
          id: "FIS-102",
          subject: "Termodinámica",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio F, Salón 102"
        }
      ],
      tuesday: [
        {
          id: "FIS-103",
          subject: "Electromagnetismo",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio F, Salón 103"
        },
        {
          id: "FIS-104",
          subject: "Óptica",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio F, Salón 104"
        }
      ],
      wednesday: [
        {
          id: "FIS-105",
          subject: "Seminario de Física",
          startTime: "08:00",
          endTime: "10:00",
          location: "Sala de Seminarios"
        },
        {
          id: "FIS-106",
          subject: "Mecánica Clásica",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio F, Salón 101"
        }
      ],
      thursday: [
        {
          id: "FIS-107",
          subject: "Termodinámica",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio F, Salón 102"
        },
        {
          id: "FIS-108",
          subject: "Electromagnetismo",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio F, Salón 103"
        }
      ],
      friday: [
        {
          id: "FIS-109",
          subject: "Óptica",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio F, Salón 104"
        },
        {
          id: "FIS-110",
          subject: "Seminario de Física",
          startTime: "10:15",
          endTime: "12:15",
          location: "Sala de Seminarios"
        }
      ]
    }
  },
  {
    "id": "T017",
    "name": "Dr. Sophia Miller",
    "photo": "https://randomuser.me/api/portraits/women/7.jpg",
    "time": "07:59 AM",
    "status": 1,
    "email": "sophia.miller1017@academicos.udg.mx",
    "department": "Química",
    "schedule": {
      monday: [
        {
          id: "QU-101",
          subject: "Química General",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio G, Salón 101"
        },
        {
          id: "QU-102",
          subject: "Química Orgánica",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio G, Salón 102"
        }
      ],
      tuesday: [
        {
          id: "QU-103",
          subject: "Química Inorgánica",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio G, Salón 103"
        },
        {
          id: "QU-104",
          subject: "Bioquímica",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio G, Salón 104"
        }
      ],
      wednesday: [
        {
          id: "QU-105",
          subject: "Seminario de Química",
          startTime: "08:00",
          endTime: "10:00",
          location: "Sala de Seminarios"
        },
        {
          id: "QU-106",
          subject: "Química General",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio G, Salón 101"
        }
      ],
      thursday: [
        {
          id: "QU-107",
          subject: "Química Orgánica",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio G, Salón 102"
        },
        {
          id: "QU-108",
          subject: "Química Inorgánica",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio G, Salón 103"
        }
      ],
      friday: [
        {
          id: "QU-109",
          subject: "Bioquímica",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio G, Salón 104"
        },
        {
          id: "QU-110",
          subject: "Seminario de Química",
          startTime: "10:15",
          endTime: "12:15",
          location: "Sala de Seminarios"
        }
      ]
    }
  },
  {
    "id": "T018",
    "name": "Mr. Isaac Flores",
    "photo": "https://randomuser.me/api/portraits/men/8.jpg",
    "time": null,
    "status": 3,
    "email": "isaac.flores1018@academicos.udg.mx",
    "department": "Educación Física",
    "schedule": {
      monday: [
        {
          id: "EF-101",
          subject: "Entrenamiento Deportivo",
          startTime: "08:00",
          endTime: "10:00",
          location: "Gimnasio, Cancha 1"
        },
        {
          id: "EF-102",
          subject: "Nutrición Deportiva",
          startTime: "10:15",
          endTime: "12:15",
          location: "Gimnasio, Aula 101"
        }
      ],
      tuesday: [
        {
          id: "EF-103",
          subject: "Metodología del Entrenamiento",
          startTime: "08:00",
          endTime: "10:00",
          location: "Gimnasio, Cancha 2"
        },
        {
          id: "EF-104",
          subject: "Psicología Deportiva",
          startTime: "10:15",
          endTime: "12:15",
          location: "Gimnasio, Aula 102"
        }
      ],
      wednesday: [
        {
          id: "EF-105",
          subject: "Seminario de Educación Física",
          startTime: "08:00",
          endTime: "10:00",
          location: "Sala de Seminarios"
        },
        {
          id: "EF-106",
          subject: "Entrenamiento Deportivo",
          startTime: "10:15",
          endTime: "12:15",
          location: "Gimnasio, Cancha 1"
        }
      ],
      thursday: [
        {
          id: "EF-107",
          subject: "Nutrición Deportiva",
          startTime: "08:00",
          endTime: "10:00",
          location: "Gimnasio, Aula 101"
        },
        {
          id: "EF-108",
          subject: "Metodología del Entrenamiento",
          startTime: "10:15",
          endTime: "12:15",
          location: "Gimnasio, Cancha 2"
        }
      ],
      friday: [
        {
          id: "EF-109",
          subject: "Psicología Deportiva",
          startTime: "08:00",
          endTime: "10:00",
          location: "Gimnasio, Aula 102"
        },
        {
          id: "EF-110",
          subject: "Seminario de Educación Física",
          startTime: "10:15",
          endTime: "12:15",
          location: "Sala de Seminarios"
        }
      ]
    }
  },
  {
    "id": "T019",
    "name": "Ms. Ava Kim",
    "photo": "https://randomuser.me/api/portraits/women/9.jpg",
    "time": "08:15 AM",
    "status": 2,
    "email": "ava.kim1019@academicos.udg.mx",
    "department": "Música",
    "schedule": {
      monday: [
        {
          id: "MU-101",
          subject: "Teoría Musical",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio H, Salón 101"
        },
        {
          id: "MU-102",
          subject: "Historia de la Música",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio H, Salón 102"
        }
      ],
      tuesday: [
        {
          id: "MU-103",
          subject: "Práctica Vocal",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio H, Salón 103"
        },
        {
          id: "MU-104",
          subject: "Instrumentos Musicales",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio H, Salón 104"
        }
      ],
      wednesday: [
        {
          id: "MU-105",
          subject: "Seminario de Música",
          startTime: "08:00",
          endTime: "10:00",
          location: "Sala de Seminarios"
        },
        {
          id: "MU-106",
          subject: "Teoría Musical",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio H, Salón 101"
        }
      ],
      thursday: [
        {
          id: "MU-107",
          subject: "Historia de la Música",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio H, Salón 102"
        },
        {
          id: "MU-108",
          subject: "Práctica Vocal",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio H, Salón 103"
        }
      ],
      friday: [
        {
          id: "MU-109",
          subject: "Instrumentos Musicales",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio H, Salón 104"
        },
        {
          id: "MU-110",
          subject: "Seminario de Música",
          startTime: "10:15",
          endTime: "12:15",
          location: "Sala de Seminarios"
        }
      ]
    }
  },
  {
    "id": "T020",
    "name": "Mr. Jordan Hughes",
    "photo": "https://randomuser.me/api/portraits/men/10.jpg",
    "time": "07:50 AM",
    "status": 1,
    "email": "jordan.hughes1020@academicos.udg.mx",
    "department": "Artes Visuales",
    "schedule": {
      monday: [
        {
          id: "AV-101",
          subject: "Dibujo Técnico",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio I, Salón 101"
        },
        {
          id: "AV-102",
          subject: "Pintura",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio I, Salón 102"
        }
      ],
      tuesday: [
        {
          id: "AV-103",
          subject: "Escultura",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio I, Salón 103"
        },
        {
          id: "AV-104",
          subject: "Historia del Arte",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio I, Salón 104"
        }
      ],
      wednesday: [
        {
          id: "AV-105",
          subject: "Seminario de Artes Visuales",
          startTime: "08:00",
          endTime: "10:00",
          location: "Sala de Seminarios"
        },
        {
          id: "AV-106",
          subject: "Dibujo Técnico",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio I, Salón 101"
        }
      ],
      thursday: [
        {
          id: "AV-107",
          subject: "Pintura",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio I, Salón 102"
        },
        {
          id: "AV-108",
          subject: "Escultura",
          startTime: "10:15",
          endTime: "12:15",
          location: "Edificio I, Salón 103"
        }
      ],
      friday: [
        {
          id: "AV-109",
          subject: "Historia del Arte",
          startTime: "08:00",
          endTime: "10:00",
          location: "Edificio I, Salón 104"
        },
        {
          id: "AV-110",
          subject: "Seminario de Artes Visuales",
          startTime: "10:15",
          endTime: "12:15",
          location: "Sala de Seminarios"
        }
      ]
    }
  }
];