/**
 * Функция-конструктор для создания предмета
 * @param {string} name - Название предмета
 * @param {number} weight - Вес предмета
 * @param {string} rarity - Редкость предмета
 */
function ItemConstructor(name, weight, rarity) {
  this.name = name;
  this.weight = weight;
  this.rarity = rarity;

  /**
   * Возвращает строку с информацией о предмете
   * @return {string} Информация о предмете
   */
  this.getInfo = function() {
    return `Item: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
  };

  /**
   * Изменяет вес предмета
   * @param {number} newWeight - Новый вес предмета
   */
  this.setWeight = function(newWeight) {
    this.weight = newWeight;
  };
}

/**
 * Функция-конструктор для создания оружия, наследует ItemConstructor
 * @param {string} name - Название оружия
 * @param {number} weight - Вес оружия
 * @param {string} rarity - Редкость оружия
 * @param {number} damage - Урон оружия
 * @param {number} durability - Прочность оружия
 */
function WeaponConstructor(name, weight, rarity, damage, durability) {
  ItemConstructor.call(this, name, weight, rarity);
  this.damage = damage;
  this.durability = durability;

  /**
   * Возвращает строку с информацией о предмете, включая параметры оружия
   * @return {string} Информация о предмете
   */
  this.getInfo = function() {
    return `Item: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}, Damage: ${this.damage}, Durability: ${this.durability}`;
  };

  /**
   * Использование оружия (уменьшает прочность на 10, если прочность > 0)
   */
  this.use = function() {
    if (this.durability > 0) {
      this.durability = Math.max(0, this.durability - 10);
    }
  };

  /**
   * Ремонт оружия (восстанавливает прочность до 100)
   */
  this.repair = function() {
    this.durability = 100;
  };
}

// Наследование
WeaponConstructor.prototype = Object.create(ItemConstructor.prototype);
WeaponConstructor.prototype.constructor = WeaponConstructor;

// Тестирование функций-конструкторов
console.log("\n=== Тестирование функций-конструкторов ===");
const sword2 = new ItemConstructor("Iron Sword", 4.0, "uncommon");
console.log(sword2.getInfo());

const bow2 = new WeaponConstructor("Crossbow", 3.5, "rare", 20, 90);
console.log(bow2.getInfo());
bow2.use();
console.log("После использования:", bow2.durability);
bow2.repair();
console.log("После ремонта:", bow2.durability);