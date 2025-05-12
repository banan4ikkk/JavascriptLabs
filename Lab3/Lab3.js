
class Item {
  /**
   * @param {string} name 
   * @param {number} weight 
   * @param {string} rarity 
   */
  constructor(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
  }

  /**
   * Возвращает информацию о предмете.
   * @returns {string}
   */
  getInfo() {
    return `Name: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
  }

  /**
   * Устанавливает новый вес предмета.
   * @param {number} newWeight
   */
  setWeight(newWeight) {
    this.weight = newWeight;
  }
}

/**
 * Класс, представляющий оружие.
 * Наследует Item.
 */
class Weapon extends Item {
  /**
   * @param {string} name
   * @param {number} weight
   * @param {string} rarity
   * @param {number} damage
   * @param {number} durability
   */
  constructor(name, weight, rarity, damage, durability) {
    super(name, weight, rarity);
    this.damage = damage;
    this.durability = durability;
  }

  /**
   * Использует оружие, уменьшая прочность.
   */
  use() {
    if (this.durability > 0) {
      this.durability -= 10;
      if (this.durability < 0) this.durability = 0;
    } else {
      console.log(`${this.name} is broken.`);
    }
  }

  /**
   * Восстанавливает прочность до 100.
   */
  repair() {
    this.durability = 100;
  }

  /**
   * @override
   * @returns {string}
   */
  getInfo() {
    return `${super.getInfo()}, Damage: ${this.damage}, Durability: ${this.durability}`;
  }
}

// Тестирование классов
const potion = new Item("Invisibility Potion", 0.6, "rare")
console.log(potion.getInfo());
potion.setWeight(0.6);
console.log("После изменения веса:", potion.getInfo());

const axe = new Weapon("Dragonbone Axe", 6.5, "legendary", 25, 90);
console.log(axe.getInfo());
axe.use();
axe.use();
console.log("После двух использований:", axe.durability);
axe.repair();
console.log("После ремонта:", axe.durability);


