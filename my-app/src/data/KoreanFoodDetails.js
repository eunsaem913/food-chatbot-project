const koreanFoodDetails = [
    {
      name: "비빔밥",
      description: "각종 나물, 고기, 계란 등을 밥 위에 올리고 고추장을 넣어 비벼 먹는 전통 한식입니다.",
      calories: 500,
      recipe: "밥, 고사리, 콩나물, 시금치, 당근, 소고기, 계란, 고추장",
      instructions: "1. 나물과 고기를 각각 조리합니다. 2. 밥 위에 모든 재료를 올리고 고추장을 넣습니다. 3. 비벼서 먹습니다."
    },
    {
      name: "김치찌개",
      description: "신 김치와 돼지고기를 주재료로 끓이는 얼큰한 한국의 대표 찌개입니다.",
      calories: 300,
      recipe: "김치, 돼지고기, 두부, 대파, 마늘, 고춧가루, 멸치육수",
      instructions: "1. 김치를 볶고 돼지고기를 넣어 함께 볶습니다. 2. 물을 붓고 두부와 대파를 넣어 끓입니다."
    },
    {
      name: "불고기",
      description: "얇게 썬 소고기를 간장 양념에 재워 구워낸 달콤짭짤한 고기 요리입니다.",
      calories: 450,
      recipe: "소고기, 간장, 설탕, 배즙, 마늘, 참기름, 양파, 당근",
      instructions: "1. 고기를 양념에 재운 뒤 숙성시킵니다. 2. 팬에 야채와 함께 볶아줍니다."
    },
    {
      name: "제육볶음",
      description: "고추장 양념에 재운 돼지고기를 볶아낸 매콤한 한국식 볶음 요리입니다.",
      calories: 550,
      recipe: "돼지고기, 고추장, 간장, 설탕, 마늘, 양파, 고춧가루",
      instructions: "1. 돼지고기를 양념에 재웁니다. 2. 야채와 함께 팬에 볶아 익힙니다."
    },
    {
      name: "된장찌개",
      description: "된장을 기본으로 한 육수에 채소와 두부를 넣고 끓인 구수한 국물 요리입니다.",
      calories: 280,
      recipe: "된장, 두부, 애호박, 감자, 대파, 마늘, 멸치육수",
      instructions: "1. 육수에 된장을 풀고, 야채와 두부를 넣어 끓입니다. 2. 약불에서 충분히 익힙니다."
    },
    {
        name: "삼겹살",
        description: "삼겹살은(는) 한국인의 대표적인 구이 요리로, 돼지고기의 풍미를 그대로 즐길 수 있습니다.",
        calories: 600,
        recipe: "삼겹살, 소금, 후추, 마늘, 상추, 쌈장",
        instructions: "1. 삼겹살에 소금과 후추를 뿌려 굽습니다. 2. 마늘과 함께 곁들여 구운 후, 상추에 싸서 먹습니다."
      },
      {
        name: "갈비찜",
        description: "갈비찜은(는) 부드럽게 익힌 소갈비를 달콤한 간장 양념으로 조리한 고급 한식입니다.",
        calories: 550,
        recipe: "소갈비, 간장, 설탕, 배, 마늘, 당근, 무",
        instructions: "1. 갈비를 핏물 제거 후 양념에 재웁니다. 2. 야채와 함께 푹 끓입니다."
      },
      {
        name: "잡채",
        description: "잡채은(는) 당면에 다양한 야채와 고기를 넣고 볶아내는 대표적인 잔칫상 요리입니다.",
        calories: 400,
        recipe: "당면, 시금치, 당근, 양파, 고기, 간장, 참기름",
        instructions: "1. 재료를 각각 볶고, 당면을 삶은 뒤 함께 섞습니다. 2. 양념으로 간을 맞춥니다."
      },
      {
        name: "떡볶이",
        description: "떡볶이은(는) 고추장 양념에 떡과 어묵을 넣고 졸여낸 매콤달콤한 간식입니다.",
        calories: 500,
        recipe: "떡, 어묵, 고추장, 설탕, 간장, 대파",
        instructions: "1. 양념을 섞어 끓이다가 떡과 어묵을 넣고 졸입니다. 2. 걸쭉해질 때까지 끓입니다."
      },
      {
        name: "갈비탕",
        description: "갈비탕은(는) 소갈비를 오래 끓여 깊은 맛을 낸 맑은 국물 요리입니다.",
        calories: 450,
        recipe: "소갈비, 무, 대파, 마늘, 국간장, 소금",
        instructions: "1. 갈비를 끓여 불순물을 제거하고, 무와 함께 다시 끓입니다. 2. 국간장으로 간을 맞춥니다."
      },
      {
        name: "순두부찌개",
        description: "순두부찌개는 부드러운 순두부와 해물 또는 고기를 넣어 끓인 얼큰한 찌개입니다.",
        calories: 350,
        recipe: "순두부, 조개, 계란, 고추기름, 대파, 마늘",
        instructions: "1. 고추기름에 마늘과 해물을 볶고 물을 부은 후, 순두부를 넣어 끓입니다. 2. 계란을 풀어 마무리합니다."
      },
      {
        name: "냉면",
        description: "냉면은 차가운 육수나 비빔 양념과 메밀면으로 만든 여름철 대표 음식입니다.",
        calories: 400,
        recipe: "냉면면, 동치미 육수, 오이, 배, 계란, 고추장(비빔냉면)",
        instructions: "1. 면을 삶고 찬물에 헹굽니다. 2. 육수를 붓거나 양념과 함께 비벼냅니다."
      },
      {
        name: "김밥",
        description: "김밥은 밥과 다양한 속재료를 김으로 말아 만든 간편한 도시락 음식입니다.",
        calories: 450,
        recipe: "밥, 김, 단무지, 시금치, 당근, 계란, 햄",
        instructions: "1. 속재료를 준비하고 밥 위에 올립니다. 2. 김으로 단단히 말아 썬 후 먹습니다."
      },
      {
        name: "부대찌개",
        description: "부대찌개는 햄, 소시지, 라면사리 등을 넣어 끓인 매콤한 찌개입니다.",
        calories: 600,
        recipe: "햄, 소시지, 라면, 김치, 고추장, 두부, 대파",
        instructions: "1. 재료를 넣고 물을 부은 후 끓입니다. 2. 라면사리를 마지막에 넣고 익힙니다."
      },
      {
        name: "콩나물국밥",
        description: "콩나물국밥은 뜨거운 콩나물 국물에 밥을 말아 먹는 시원하고 개운한 해장 음식입니다.",
        calories: 350,
        recipe: "콩나물, 밥, 대파, 마늘, 달걀, 국간장",
        instructions: "1. 콩나물을 끓인 육수에 밥을 넣고 달걀을 올립니다. 2. 뚝배기에서 보글보글 끓입니다."
      },
      {
        name: "파전",
        description: "파전은 부침가루에 파와 해물 등을 넣어 팬에 부친 전통 전 요리입니다.",
        calories: 500,
        recipe: "부침가루, 파, 오징어, 새우, 계란",
        instructions: "1. 반죽을 만들어 재료를 섞습니다. 2. 팬에 부쳐 앞뒤로 노릇하게 익힙니다."
      },
      {
        name: "감자탕",
        description: "감자탕은 돼지 등뼈와 감자, 시래기를 푹 끓인 얼큰한 국물 요리입니다.",
        calories: 550,
        recipe: "돼지등뼈, 감자, 시래기, 깻잎, 들깨가루, 고추가루",
        instructions: "1. 등뼈를 끓여 육수를 만들고, 감자와 시래기를 넣어 끓입니다. 2. 깻잎과 들깨로 마무리합니다."
      },
      {
        name: "오징어볶음",
        description: "오징어볶음은 오징어와 야채를 매콤하게 볶아낸 밥반찬입니다.",
        calories: 400,
        recipe: "오징어, 양파, 고추장, 고춧가루, 마늘, 대파",
        instructions: "1. 오징어와 야채를 양념에 볶습니다. 2. 마지막에 참기름을 뿌려 마무리합니다."
      },
      {
        name: "닭갈비",
        description: "닭갈비는 닭고기를 고추장 양념에 볶아내는 매콤한 철판 요리입니다.",
        calories: 600,
        recipe: "닭고기, 고추장, 양배추, 고구마, 양파, 깻잎",
        instructions: "1. 닭고기를 양념에 재운 후 채소와 함께 볶습니다. 2. 익을 때까지 잘 저어가며 익힙니다."
      },
      {
        name: "해물파전",
        description: "해물파전은 파와 오징어, 새우 등 해물을 넣어 바삭하게 부친 전입니다.",
        calories: 500,
        recipe: "부침가루, 해물믹스, 파, 계란",
        instructions: "1. 재료를 반죽에 섞고, 팬에 넓게 부쳐 바삭하게 익힙니다."
      }      
    
    /*
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },
    {
      name: "",
      description: "",
      calories: ,
      recipe: "",
      instructions: ""
    },

    */
  ];
  
  export default koreanFoodDetails;
  
  
  