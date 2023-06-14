---
icon: pen-to-square
date: 2023-06-15
tag: 
 - 设计模式
---


# 设计模式

## 策略模式

### **介绍**

定义一系列算法，将每一个算法封装起来，并让它们可以相互替换。策略模式让算法可以独立于使用它的客户变化。

### **结构**

![image-20230526150814561](https://oooooo.oss-cn-fuzhou.aliyuncs.com/img/image-20230526150814561.png)

### **角色**

- Context（环境类）
- Strategy（抽象策略类）
- Concrete Strategy（具体策略类）

### **实现**

```java
//抽象策略类代码
public abstract class Strategy {
    public abstract void algorithm();  //声明抽象算法
}
```

```java
//具体策略类代码
public class ConcreteStrategyA extends Strategy {
    //算法的具体实现
    public void algorithm() {
        //算法A
    }
}
```

```java
//环境类代码
public class Context {
    private Strategy strategy; //维持一个对抽象策略类的引用
    //注入策略对象
    public void setStrategy(Strategy strategy) {
        this.strategy= strategy;
    }

    //调用策略类中的算法
    public void algorithm() {
        strategy.algorithm();
    }
}
```

```java
//客户端代码片段
……
Context context = new Context();
Strategy strategy;
strategy = new ConcreteStrategyA(); //可在运行时指定类型，通过配置文件和反射机制实现
context.setStrategy(strategy);
context.algorithm();
……

```

## 装饰器模式

### 介绍

在不改变一个对象本身功能的基础上给对象增加额外的新行为，引入了装饰类，在装饰类中既可以调用待装饰的原有类的方法，还可以增加新的方法，以扩展原有类的功能

### **结构**

![image-20230526161910156](https://oooooo.oss-cn-fuzhou.aliyuncs.com/img/image-20230526161910156.png)

### **角色**

- Component（抽象构件）

- Concrete Component（具体构件）

- Decorator（抽象装饰类）

- Concrete Decorator（具体装饰类）

### **实现**

```java
//	抽象构件
public abstract class Component {
	public abstract void display();
}
```

```java
//  具体构件
public class ListBox extends Component {
    public void display() {
        System.out.println("显示列表框！");
    }
}

--------------------------------------------------------------------------
    
//  具体构件
public class TextBox extends Component {
	public void display() {
		System.out.println("显示文本框！");
	}
}
```

```java
//	抽象装饰类
public class ComponentDecorator extends Component {
    //维持对抽象构件类型对象的引用
	private Component component;  
  
	//注入抽象构件类型的对象
	public ComponentDecorator(Component component) {
		this.component = component;
	}

	public void display() {
		component.display();
	}
}
```

```java
//	具体装饰类
public class BlackBorderDecorator extends ComponentDecorator {
	public BlackBorderDecorator(Component component) {
		super(component);
	}

	public void display() {
		this.setBlackBorder();
		super.display();
	}

	public void setBlackBorder() {
		System.out.println("为构件增加黑色边框！");
	}
}
```

## 观察者模式

### 介绍

定义对象之间的一种一对多依赖关系，使得每当一个对象状态发生改变时，其相关依赖对象都得到通知并被自动更新。

### **结构**

![image-20230528120615051](https://oooooo.oss-cn-fuzhou.aliyuncs.com/img/image-20230528120615051.png)

### 	角色

- Subject（目标）
- Concrete Subject（具体目标）
- Observer（观察者）
- Concrete Observer（具体观察者）

### 实现

```java

//战队控制中心类：抽象目标类
public abstract class AllyControlCenter {
	protected String allyName; //战队名称
	protected ArrayList<Observer> players = new ArrayList<Observer>(); //定义一个集合用于存储战队成员
	
	public void setAllyName(String allyName) {
		this.allyName = allyName;
	}
	
	public String getAllyName() {
		return this.allyName;
	}
	
	//注册方法
	public void join(Observer obs) {
		System.out.println(obs.getName() + "加入" + this.allyName + "战队！");
		players.add(obs);
	}
	
	//注销方法
	public void quit(Observer obs) {
		System.out.println(obs.getName() + "退出" + this.allyName + "战队！");
		players.remove(obs);
	}
	
	//声明抽象通知方法
	public abstract void notifyObserver(String name);
}
```

```java

//具体战队控制中心类：具体目标类
public class ConcreteAllyControlCenter extends AllyControlCenter {
	public ConcreteAllyControlCenter(String allyName) {
		System.out.println(allyName + "战队组建成功！");
		System.out.println("----------------------------");
		this.allyName = allyName;
	}
	
	//实现通知方法
	public void notifyObserver(String name) {
		System.out.println(this.allyName + "战队紧急通知，盟友" + name + "遭受敌人攻击！");
		//遍历观察者集合，调用每一个盟友（自己除外）的支援方法
		for(Object obs : players) {
			if (!((Observer)obs).getName().equalsIgnoreCase(name)) {
				((Observer)obs).help();
			}
		}		
	}
}
```

```java
//抽象观察类
public interface Observer {
	public String getName();
	public void setName(String name);
	public void help(); //声明支援盟友方法(响应方法)
	public void beAttacked(AllyControlCenter acc); //声明遭受攻击方法
}
```

```java
//战队成员类：具体观察者类
public class Player implements Observer {
	private String name;

	public Player(String name) {
		this.name = name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getName() {
		return this.name;
	}
	
	//支援盟友方法的实现
	public void help() {
		System.out.println("坚持住，" + this.name + "来救你！");
	}
	
	//遭受攻击方法的实现，当遭受攻击时将调用战队控制中心类的通知方法notifyObserver()来通知盟友
	public void beAttacked(AllyControlCenter acc) {
		System.out.println(this.name + "被攻击！");
		acc.notifyObserver(name);		
	}
}
```

```java
//客户端代码
public class Client {
	public static void main(String args[]) {
		//定义观察目标对象
		AllyControlCenter acc;
		acc = new ConcreteAllyControlCenter("金庸群侠");
		
        //定义四个观察者对象
		Observer player1,player2,player3,player4,player5;
		
        //注册观察者
		player1 = new Player("杨过");
		acc.join(player1);
		
		player2 = new Player("令狐冲");
		acc.join(player2);
		
		player3 = new Player("张无忌");
		acc.join(player3);
		
		player4 = new Player("段誉");
		acc.join(player4);
		
		player5 = new Player("郭靖");
		acc.join(player5);
        
		
		//某成员遭受攻击 调用通知方法
		player2.beAttacked(acc);
	}
}
```

## 适配器模式

### 介绍

适配器模式是一种结构型设计模式，旨在解决两个不兼容接口之间的兼容性问题。它允许将一个类的接口转换成客户端所期望的另一个接口

### 结构

![image-20230528124621463](https://oooooo.oss-cn-fuzhou.aliyuncs.com/img/image-20230528124621463.png)

### 角色

- Target（目标抽象类）
- Adapter（适配器类）
- Adaptee（适配者类）

### 实现

```java
//救护车灯类，充当适配者
public class AmbulanceLamp {
	public void alarmLamp() {
		System.out.println("呈现救护车灯闪烁！");
	}
}
```

```java
//救护车声音类，充当适配者
public class AmbulanceSound {
	public void alarmSound() {
		System.out.println("发出救护车声音！");
	}
}
```

```java
//救护车适配器，充当适配器
public class AmbulanceCarAdapter extends CarController {
	private AmbulanceSound sound;  //定义适配者AmbulanceSound对象
	private AmbulanceLamp lamp;    //定义适配者AmbulanceLamp对象
	
	public AmbulanceCarAdapter() {
		sound = new AmbulanceSound();
		lamp = new AmbulanceLamp();
	}
	
	//发出救护车声音
	public void phonate() {
		sound.alarmSound();  //调用适配者类AmbulanceSound的方法(类似于转发调用)
	}
	
	//呈现救护车灯闪烁
	public void twinkle() {
		lamp.alarmLamp();   //调用适配者类AmbulanceLamp的方法
	}
}
```



```java
//汽车控制类，充当目标抽象类
public abstract class CarController {
    public void move() {
        System.out.println("玩具汽车移动！");
    }

    public abstract void phonate(); //发出声音

    public abstract void twinkle(); //灯光闪烁
}
```

## 抽象工厂模式

### 介绍

提供一个创建一系列相关或相互依赖对象的接口，而无须指定它们具体的类。又称为工具(Kit)模式抽象工厂模式中的具体工厂不只是创建一种产品，它负责创建一族产品当一个工厂等级结构可以创建出分属于不同产品等级结构的一个产品族中的所有对象时，抽象工厂模式比工厂方法模式更为简单、更有效率

### 结构

![image-20230529121322432](https://oooooo.oss-cn-fuzhou.aliyuncs.com/img/image-20230529121322432.png)

### 角色

- Abstract Factory（抽象工厂）
- Concrete Factory（具体工厂）
- Abstract Product（抽象产品）
- Concrete Product（具体产品）

### 实现

**三种抽象产品**

```java
// 抽象按钮
public interface Button {
	public void display();
}
```

```java
// 抽象边框
public interface ComboBox {
	public void display();
}
```

```java
// 抽象文本框
public interface TextField {
	public void display();
}
```

**抽象工厂**

```java
public interface SkinFactory {
	public Button createButton();
	public TextField createTextField();
	public ComboBox createComboBox();
}
```

**具体产品（部分）**

```java
	public class SpringButton implements Button {
	public void display() {
		System.out.println("显示浅绿色按钮。");
	}
}
```

```java
public class SpringComboBox implements ComboBox {
	public void display() {
		System.out.println("显示绿色边框组合框。");
	}
}
```

```java
public class SummerButton implements Button {
	public void display() {
		System.out.println("显示浅蓝色按钮。");
	}	
}
```

```java
public class SummerComboBox implements ComboBox {
	public void display() {
		System.out.println("显示蓝色边框组合框。");
	}
}
```

**具体工厂**

```java
// SpringSkinFactory工厂
public class SpringSkinFactory implements SkinFactory {
	public Button createButton() {
		return new SpringButton();
	}

	public TextField createTextField() {
		return new SpringTextField();
	}

	public ComboBox createComboBox() {
		return new SpringComboBox();
	}
}
```

```java
// SummerSkinFactory工厂
public class SummerSkinFactory implements SkinFactory {
	public Button createButton() {
		return new SummerButton();
	}

	public TextField createTextField() {
		return new SummerTextField();
	}

	public ComboBox createComboBox() {
		return new SummerComboBox();
	}
}
```

## 建造者模式

### 介绍

将一个复杂对象的==构建与它的表示分离==，使得同样的构建过程可以创建不同的表示。将客户端与包含多个部件的复杂对象的创建过程分离，客户端无须知道复杂对象的内部组成部分与装配方式，只需要知道所需建造者的类型即可关注如何逐步创建一个复杂的对象，不同的建造者定义了不同的创建过程

### 结构

![image-20230529185109415](https://oooooo.oss-cn-fuzhou.aliyuncs.com/img/image-20230529185109415.png)

### 角色

- Builder（抽象建造者）
- Concrete Builder（具体建造者）
- Product（产品）
- Director（指挥者）

### 实现

```java
// 具体角色类（产品） 
public class Actor {
	private String type; //角色类型
	private String sex; //性别
	private String face; //脸型
	private String costume; //服装
	private String hairstyle; //发型

//省略具体的getter setter
}
```

```java
// 抽象建造者
public abstract class ActorBuilder {
    protected Actor actor = new Actor();

    public abstract void buildType();

    public abstract void buildSex();

    public abstract void buildFace();

    public abstract void buildCostume();

    public abstract void buildHairstyle();

    //工厂方法，返回一个完整的游戏角色对象
    public Actor createActor() {
        return actor;
    }
}
```

```java
// 具体建造者
public class AngelBuilder extends ActorBuilder {
	public void buildType() {
		actor.setType("天使");
	}

	public void buildSex() {
		actor.setSex("女");
	}

	public void buildFace() {
		actor.setFace("漂亮");
	}

	public void buildCostume() {
		actor.setCostume("白裙");
	}

	public void buildHairstyle() {
		actor.setHairstyle("披肩长发");
	}	
}
```

```java
// 指挥者
public class ActorController {
    //逐步构建复杂产品对象
	public Actor construct(ActorBuilder ab) {
		Actor actor;
		ab.buildType();
		ab.buildSex();
		ab.buildFace();
		ab.buildCostume();
		ab.buildHairstyle();
		actor=ab.createActor();
		return actor;
	}
}
```

```java
// 客户端代码
public class Client {
    public static void main(String args[]) {
        //针对抽象建造者编程
        ActorBuilder ab; 
        //反射生成具体建造者对象
        ab = (ActorBuilder)XMLUtil.getBean(); 

        ActorController ac = new ActorController();
        Actor actor;
        
        //通过指挥者创建完整的建造者对象
        //传入具体建造者对象（ActorBuilder 的子类对象）
        actor = ac.construct(ab); 
        

        String type = actor.getType();
        System.out.println(type + "的外观：");
        System.out.println("性别：" + actor.getSex());
        System.out.println("面容：" + actor.getFace());
        System.out.println("服装：" + actor.getCostume());
        System.out.println("发型：" + actor.getHairstyle());
    }
}
```

## 原型模式

### 介绍

使用原型实例指定待创建对象的类型，并且通过复制这个原型来创建新的对象

### 结构

![image-20230530091411776](https://oooooo.oss-cn-fuzhou.aliyuncs.com/img/image-20230530091411776.png)

### 角色

- Prototype（抽象原型类）
- Concrete Prototype（具体原型类）
- Client（客户类）

### 实现

#### 浅拷贝

(其中的引用对象相同)

```java
public class WeeklyLog implements Cloneable {
    //为了简化设计和实现，假设一份工作周报中只有一个附件对象，实际情况中可以包含多个附件，可以通过List等集合对象来实现
    private Attachment attachment;
    private String name;
    private String date;
    private String content;

    public void setAttachment(Attachment attachment) {
        this.attachment = attachment;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Attachment getAttachment() {
        return (this.attachment);
    }

    public String getName() {
        return (this.name);
    }

    public String getDate() {
        return (this.date);
    }

    public String getContent() {
        return (this.content);
    }

    //使用clone()方法实现浅克隆
    public WeeklyLog clone() {
        Object obj = null;
        try {
            obj = super.clone();
            return (WeeklyLog) obj;
        } catch (CloneNotSupportedException e) {
            System.out.println("不支持复制！");
            return null;
        }
    }
}
```

#### 深拷贝

==（序列化与反序列化）==

序列化是将对象转换为字节流的过程，可以将对象保存到文件、传输到网络或在进程之间进行通信。在序列化过程中，对象的状态（即对象的数据）被转换为字节序列，包括对象的字段和相应的数值。序列化后的字节流可以被保存下来或传输给其他地方。

反序列化是将字节流转换为对象的过程，将保存在字节流中的数据重新构造成对象。在反序列化过程中，字节序列被还原为对象的状态，重新创建对象并将保存的数据填充到对象的字段中。

在写入字节流时，对象的所有字段都会被序列化为字节序列。而在读取字节流时，字节序列会被反序列化为一个新的对象，并将保存的数据填充到新对象的字段中。

由于反序列化过程会重新创建对象，因此新对象与原始对象是完全独立的，它们拥有相同的数据但是位于不同的内存位置。这样就实现了深拷贝，保留了对象及其所有引用类型字段的数据，并且不共享同一块内存。

需要注意的是，为了使对象能够进行序列化和反序列化，需要实现 `Serializable` 接口，并确保对象的所有引用类型字段也是可序列化的。

```java
public class WeeklyLog implements Serializable {
	private Attachment attachment;
	private String name;
	private String date;
	private String content;

	public void setAttachment(Attachment attachment) {
		this.attachment = attachment;
	}

	public void setName(String name) {
		this.name = name; 
	}

	public void setDate(String date) {
		this.date = date; 
	}

	public void setContent(String content) {
		this.content = content; 
	}

	public Attachment getAttachment() {
		return (this.attachment);
	}

	public String getName() {
		return (this.name); 
	}

	public String getDate() {
		return (this.date); 
	}

	public String getContent() {
		return (this.content); 
	}

	//使用序列化技术实现深克隆
	public WeeklyLog deepClone() throws IOException, ClassNotFoundException, OptionalDataException {
		//将对象写入流中
		ByteArrayOutputStream bao=new ByteArrayOutputStream();
		ObjectOutputStream oos=new ObjectOutputStream(bao);
		oos.writeObject(this);
		
		//将对象从流中取出
		ByteArrayInputStream bis=new ByteArrayInputStream(bao.toByteArray());
		ObjectInputStream ois=new ObjectInputStream(bis);
		return (WeeklyLog)ois.readObject();
	}
}
```

## 单例模式

### 介绍

一个类只有一个实例，并提供一个全局访问点来访问这个唯一实例。

### 结构

![image-20230530150040291](https://oooooo.oss-cn-fuzhou.aliyuncs.com/img/image-20230530150040291.png)

### 角色

- Singleton（单例）

### 实现

#### 饿汉式

```java
public class Singleton {
    // 私有静态变量，用于保存单例实例
    private static Singleton instance = new Singleton();

    // 私有构造函数，防止外部直接实例化对象
    private Singleton() {
        // 初始化操作
    }

    // 公共静态方法，提供全局访问点获取单例实例
    public static Singleton getInstance() {
        return instance;
    }
}

```

#### 懒汉式

- 基础版

多线程环境下可能会出现问题。如果多个线程同时访问`getInstance()`方法，并且在`instance`还未被创建时，那么每个线程都会通过判断`instance`为`null`的条件，并创建一个新的实例。这样就会破坏单例的唯一性，导致多个实例被创建。

```java
public class LazySingleton {
    private static LazySingleton instance = null;

    private LazySingleton() { }

    public static LazySingleton getInstance() {
        if (instance == null) {
            instance = new LazySingleton();
        }
        return instance;
    }
}

```

- 添加锁方法

通过`synchronized`关键字修饰`getInstance()`方法，以确保在多线程环境下只创建一个实例。当第一个线程调用`getInstance()`方法时，如果实例尚未创建，它将创建一个新的实例

<u>存在缺点</u>：

1. 每次调用`getInstance()`方法都会进入`synchronized`同步块，即使实例已经被创建。这会造成不必要的同步开销，影响性能。
2. 在多线程环境下，当多个线程同时通过第一个判断条件`instance == null`时，它们会依次进入`synchronized`同步块，而只有一个线程能够创建实例，其他线程会被阻塞。这可能会引起线程竞争和性能问题。

```java
public class LazySingleton {
    private static LazySingleton instance = null;

    private LazySingleton() {
        // 私有构造函数，防止外部直接实例化对象
    }

    /**
     * 公共静态方法，提供全局访问点获取单例实例
     *
     * @return 单例实例
     */
    synchronized public static LazySingleton getInstance() {
        if (instance == null) {
            // 如果实例为空，则创建新的实例
            instance = new LazySingleton();
        }
        return instance;
    }
}
```

- 锁代码段

![image-20230530151643226](https://oooooo.oss-cn-fuzhou.aliyuncs.com/img/image-20230530151643226.png)

```java
public class LazySingleton {
    private volatile static LazySingleton instance = null;

    private LazySingleton() {
        // 私有构造函数
    }

    public static LazySingleton getInstance() {
        if (instance == null) { // 第一个判断，避免不必要的同步
            synchronized (LazySingleton.class) { // synchronized关键字修饰的同步块
                if (instance == null) { // 第二个判断，确保只有一个线程创建实例
                    instance = new LazySingleton();
                }
            }
        }
        return instance;
    }
}

```

#### 静态内部类

==相关介绍==：

在静态内部类中定义的静态方法可以直接被调用，不需要通过创建内部类的实例来访问。静态内部类与外部类之间是独立的，因此可以直接访问静态内部类中的静态成员，包括静态方法。

在上述示例中，静态内部类`HolderClass`中的`instance`变量是私有静态的，而`getInstance()`方法是公共静态的。这意味着可以通过`Singleton.HolderClass.instance`直接访问`instance`变量，也可以通过`Singleton.getInstance()`调用`getInstance()`方法来获取单例实例。这种方式提供了更简洁的访问方式，无需显式创建内部类实例。

需要注意的是，静态内部类中不能直接访问外部类的非静态成员，因为静态内部类在没有外部类实例的情况下也可以被访问。如果需要访问外部类的非静态成员，可以通过创建外部类的实例来实现。

```java
// Initialization on Demand Holder
public class Singleton {
    private Singleton() {
        // 私有构造函数，防止外部直接实例化对象
    }
    
    // 静态内部类
    private static class HolderClass {
        private final static Singleton instance = new Singleton();
    }	
    
    /**
     * 公共静态方法，提供全局访问点获取单例实例
     *
     * @return 单例实例
     */
    public static Singleton getInstance() {
        return HolderClass.instance;
    }
}

```

```java
// 对应调用方法
public class Main {
    public static void main(String[] args) {
        Singleton singleton = Singleton.getInstance();
        // 使用单例对象
    }
}
```

## 桥接模式

### 介绍

桥接模式是一种结构型设计模式，它旨在将抽象部分与其实现部分分离，使它们可以独立地变化。它通过创建一个桥接接口，将抽象和实现解耦，使它们可以独立地进行扩展。

在桥接模式中，存在两个维度的抽象和实现，通过桥接接口将它们连接起来。其中，抽象部分定义了高层的抽象方法和属性，而实现部分定义了具体实现的方法和属性。通过桥接接口，抽象部分和实现部分可以独立地进行扩展和变化，而彼此之间的关系通过桥接接口来实现。

### 结构

![image-20230530152030299](https://oooooo.oss-cn-fuzhou.aliyuncs.com/img/image-20230530152030299.png)

### 角色

- Abstraction（抽象类）
- Refined Abstraction（扩充抽象类）
- Implementor（实现类接口）
- Concrete Implementor（具体实现类）

### 实现

**理解**：通过桥接模式，图像实现类（如 `LinuxImp`）和操作系统实现类（如 `Linux`）被解耦，它们可以独立地变化和扩展。图像实现类负责将图像数据转换成特定格式（如像素矩阵），而操作系统实现类负责将像素矩阵在特定操作系统中进行显示。这样，通过注入不同的图像实现类和操作系统实现类，可以实现不同图像格式在不同操作系统下的显示，而不需要修改现有的类结构。

```java
//抽象图像类，充当抽象类
public abstract class Image {
    protected ImageImp imp;

    //注入实现类接口对象
    //桥接的关键位置
    public void setImageImp(ImageImp imp) {
        this.imp = imp;
    }

    //解析文件
    public abstract void parseFile(String fileName);
}
```

```java
//具体图像类
//BMP格式图像类，充当扩充抽象类
public class BMPImage extends Image {
	public void parseFile(String fileName) {
      //模拟解析BMP文件并获得一个像素矩阵对象m;
      Matrix m = new Matrix(); 
      imp.doPaint(m);
      System.out.println(fileName + "，格式为BMP。");
  }
}

//GIF格式图像类，充当扩充抽象类
public class GIFImage extends Image {
	public void parseFile(String fileName) {
      //模拟解析GIF文件并获得一个像素矩阵对象m;
      Matrix m = new Matrix(); 
      imp.doPaint(m);
      System.out.println(fileName + "，格式为GIF。");
  }
}
```

```java
//抽象操作系统实现类，充当实现类接口
public interface ImageImp {
    public void doPaint(Matrix m);  //显示像素矩阵m
}
```

```java
//Linux操作系统实现类，充当具体实现类
public class LinuxImp implements ImageImp {
  public void doPaint(Matrix m) {
  	//调用Linux系统的绘制函数绘制像素矩阵
  	System.out.print("在Linux操作系统中显示图像：");
  }
}
```

```java
//像素矩阵类，辅助类
public class Matrix {
    //代码省略
}
```



## 状态模式

### 介绍

它允许对象在内部状态改变时改变其行为。该模式将对象的行为封装在不同的状态对象中，使得对象在不同状态下具有不同的行为，同时将状态的切换和行为的执行解耦。

### 结构

![image-20230531170222824](https://oooooo.oss-cn-fuzhou.aliyuncs.com/img/image-20230531170222824.png)

### 角色

- Context（环境类）

- State（抽象状态类）

- Concrete State（具体状态类）

### 实现

具体的状态转换逻辑位于具体状态类中，每个状态类负责自己的状态转换和相应的操作

還有另外幾種狀態類的轉換方式 只提供對對應轉換方式代碼

```java
//抽象開關對象 
public abstract class SwitchState {
	public abstract void on(Switch s);
	public abstract void off(Switch s);

}
```

```java
// 具體開關對象
// 方法中會傳入一個對象 并修改該對象的currentstate
// 具體代碼可見switch

//打开状态类
public class OnState extends SwitchState {
    public void on(Switch s) {
        System.out.println("已经打开！");
    }

    public void off(Switch s) {
        System.out.println("关闭！");
        s.setState(Switch.getState("off"));
    }
}


//关闭状态类
public class OffState extends SwitchState{
	public void on(Switch s) {
		System.out.println("打开！");
		s.setState(Switch.getState("on"));
	}
	
	public void off(Switch s) {
		System.out.println("已经关闭！");
	}
}
```

```java
public class Switch {
	//定义三个静态的状态对象 所有的开关对象共享状态
	private static SwitchState currentState,onState,offState;
	private String name;

	// 构造函数 默认状态为开启
	public Switch(String name) {
		this.name = name;
		onState = new OnState();
		offState = new OffState();
		currentState = onState;
	}

    // 該方法會被狀態方法進行調用
	public void setState(SwitchState state) {
		currentState = state;
	}
    

	public static SwitchState getState(String type) {
		if (type.equalsIgnoreCase("on")) {
			return onState;
		}
		else {
			return offState;
		}
	}
		
    
    //下面兩個方法會將當前對象傳入 若狀態改變則會對對cuurent進行修改
    //打开开关
	public void on() {
		System.out.print(name);
		currentState.on(this);
	}
	
	//关闭开关
	public void off() {
		System.out.print(name);
		currentState.off(this);
	}

```

### 其餘轉換方式實現

- 放大鏡

```java
//在環境類中進行轉換
//屏幕类：环境类
public class Screen {
	//枚举所有的状态，currentState表示当前状态
	private ScreenState currentState, normalState, largerState, largestState;

	public Screen() {
  	this.normalState = new NormalState(); //创建正常状态对象
  	this.largerState = new LargerState(); //创建二倍放大状态对象
  	this.largestState = new LargestState(); //创建四倍放大状态对象
  	this.currentState = normalState; //设置初始状态
  	this.currentState.display();
	}
	
	public void setState(ScreenState state) {
		this.currentState = state;
	}
	
	//单击事件处理方法，封转了对状态类中业务方法的调用和状态的转换
	public void onClick() {
	  	if (this.currentState == normalState) {
	  		this.setState(largerState);
	  		this.currentState.display();
	  	}
	  	else if (this.currentState == largerState) {
	  		this.setState(largestState);
	  		this.currentState.display();
	  	}
	  	else if (this.currentState == largestState) {
	  		this.setState(normalState);
	  		this.currentState.display();
	  	}
	}
}

```

- 銀行賬戶

```java
//银行账户：环境类
public class Account {
	private AccountState state; //维持一个对抽象状态对象的引用
	private String owner; //开户名
	private double balance = 0; //账户余额
	
	public Account(String owner,double init) {
		this.owner = owner;
		this.balance = balance;
		this.state = new NormalState(this); //设置初始状态
		System.out.println(this.owner + "开户，初始金额为" + init);	
		System.out.println("---------------------------------------------");	
	}
	
	public double getBalance() {
		return this.balance;
	}
	
	public void setBalance(double balance) {
		this.balance = balance;
	}
	
	public void setState(AccountState state) {
		this.state = state;
	}
	
	public void deposit(double amount) {
		System.out.println(this.owner + "存款" + amount);
		state.deposit(amount); //调用状态对象的deposit()方法
		System.out.println("现在余额为"+ this.balance);
		System.out.println("现在帐户状态为"+ this.state.getClass().getName());
		System.out.println("---------------------------------------------");			
	}
	
	public void withdraw(double amount) {
		System.out.println(this.owner + "取款" + amount);
		state.withdraw(amount); //调用状态对象的withdraw()方法
		System.out.println("现在余额为"+ this.balance);
		System.out.println("现在帐户状态为"+ this. state.getClass().getName());		
		System.out.println("---------------------------------------------");
	}
	
	public void computeInterest()
	{
		state.computeInterest(); //调用状态对象的computeInterest()方法
	}
}

```

```java
//抽象状态类
public abstract class AccountState {
	protected Account acc;
	public abstract void deposit(double amount);
	public abstract void withdraw(double amount);
	public abstract void computeInterest();
	public abstract void stateCheck();
}
```

```java
//正常状态：具体状态类
public class NormalState extends AccountState {
	public NormalState(Account acc) {
		this.acc = acc;
	}

	public NormalState(AccountState state) {
		this.acc = state.acc;
	}
		
	public void deposit(double amount) {
		acc.setBalance(acc.getBalance() + amount);
		stateCheck();
	}
	
	public void withdraw(double amount) {
		acc.setBalance(acc.getBalance() - amount);
		stateCheck();
	}
	
	public void computeInterest()
	{
		System.out.println("正常状态，无须支付利息！");
	}
	
	//状态转换
	public void stateCheck() {
		if (acc.getBalance() > -2000 && acc.getBalance() <= 0) {
			acc.setState(new OverdraftState(this));
		}
		else if (acc.getBalance() == -2000) {
			acc.setState(new RestrictedState(this));
		}
		else if (acc.getBalance() < -2000) {
			System.out.println("操作受限！");
		}	
	}   
}
```

```java
//透支状态：具体状态类
public class OverdraftState extends AccountState {
	public OverdraftState(AccountState state) {
		this.acc = state.acc;
	}
	
	public void deposit(double amount) {
		acc.setBalance(acc.getBalance() + amount);
		stateCheck();
	}
	
	public void withdraw(double amount) {
		acc.setBalance(acc.getBalance() - amount);
		stateCheck();
	}
	
	public void computeInterest() {
		System.out.println("计算利息！");
	}
	
	//状态转换
	public void stateCheck() {
		if (acc.getBalance() > 0) {
			acc.setState(new NormalState(this));
		}
		else if (acc.getBalance() == -2000) {
			acc.setState(new RestrictedState(this));
		}
		else if (acc.getBalance() < -2000) {
			System.out.println("操作受限！");
		}
	}
}

```

```java
//受限状态：具体状态类
public class RestrictedState extends AccountState {
	public RestrictedState(AccountState state) {
		this.acc = state.acc;
	}
	
	public void deposit(double amount) {
		acc.setBalance(acc.getBalance() + amount);
		stateCheck();
	}
	
	public void withdraw(double amount) {
		System.out.println("帐号受限，取款失败");
	}
	
	public void computeInterest() {
		System.out.println("计算利息！");
	}
	
	//状态转换
	public void stateCheck() {
		if(acc.getBalance() > 0) {
			acc.setState(new NormalState(this));
		}
		else if(acc.getBalance() > -2000) {
			acc.setState(new OverdraftState(this));
		}
	}
}

```

```java
public class Client {
	public static void main(String args[]) {
		Account acc = new Account("段誉",0.0);
		acc.deposit(1000);
		acc.withdraw(2000);
		acc.deposit(3000);
		acc.withdraw(4000);
		acc.withdraw(1000);
		acc.computeInterest();
	}
}
```



## 命令模式

### 介绍

命令模式（Command Pattern）用于将请求（命令）封装成一个对象，使得可以将不同的请求参数化并且支持请求的排队、记录日志、撤销等操作

### 结构

![image-20230531111839798](https://oooooo.oss-cn-fuzhou.aliyuncs.com/img/image-20230531111839798.png)

### 角色

- 命令接口（Command）
- 具体命令（Concrete Command）
- 命令接收者（Receiver）
- 命令发起者（Invoker）

### 实现

```java
//	抽象命令
public abstract class Command {
	public abstract void execute();
}
```

```java
// 具体命令

// 帮助
public class HelpCommand extends Command {
	private DisplayHelpClass hcObj;   //维持对请求接收者的引用
	
	public HelpCommand() {
		hcObj = new DisplayHelpClass();
	}

	//命令执行方法，将调用请求接收者的业务方法
	public void execute() {
		hcObj.display();
	}
}

// 退出
public class ExitCommand extends Command {
	private SystemExitClass seObj;  //维持对请求接收者的引用
	
	public ExitCommand() {
		seObj = new SystemExitClass();
	}
	
	//命令执行方法，将调用请求接收者的业务方法
	public void execute() {
		seObj.exit();
	}
}
```

```java
// 接收者

public class DisplayHelpClass {
	public void display() {
		System.out.println("显示帮助文档！");
	}
}

public class SystemExitClass {
	public void exit() {
		System.out.println("退出系统！");
	}
}
```

```java
// 调用者
public class FunctionButton {
	private Command command;  //维持一个抽象命令对象的引用
	
	//为功能键注入命令
	public void setCommand(Command command) {
		this.command = command;
	}
	
	//发送请求的方法
	public void click() {
		System.out.print("单击功能键: ");
		command.execute();
	}
}
```

```java
// 客户端
public class Client {
	public static void main(String args[]) {

		FunctionButton fb = new FunctionButton();

		Command command; //定义命令对象
		command = (Command)XMLUtil.getBean(); //读取配置文件，反射生成对象
		
		fb.setCommand(command); //将命令对象注入功能键
		fb.click(); //调用功能键的业务方法
	}
}
```

## 組合模式

### 介紹

组合模式是一种结构型设计模式，用于将对象组合成树形结构以表示"部分-整体"的层次关系，使得用户对单个对象和组合对象的使用具有一致性。

### 結構

![image-20230531172221176](https://oooooo.oss-cn-fuzhou.aliyuncs.com/img/image-20230531172221176.png)

### 角色

- 组件（Component）：是组合中的抽象基类，定义了组合对象和叶子对象的共有操作接口。它可以是抽象类或接口，声明了一些用于管理子对象的方法，例如添加、删除、获取子对象等。
- 叶子（Leaf）：是组合中的叶子节点，表示组合对象中的基本元素，它没有子对象。
- 容器（Composite）：是组合中的容器节点，表示可以包含子对象的复杂对象。容器对象中通常会持有一个或多个子对象，并实现组合对象的共有操作接口。容器对象的操作会递归地调用子对象的操作，以实现对整个树形结构的操作。
- 客户端（Client）：通过组合对象的操作接口来操作组合对象和叶子对象。

### 實現

```java
//組件
public abstract class AbstractFile {
	public abstract void add(AbstractFile file);
	public abstract void remove(AbstractFile file);
	public abstract AbstractFile getChild(int i);
	public abstract void killVirus();
}
```

```java
//容器
public class Folder extends AbstractFile {
	//定义集合fileList，用于存储AbstractFile类型的成员
	private ArrayList<AbstractFile> fileList=new ArrayList<AbstractFile>();
	private String name;
		
	public Folder(String name) {
		this.name = name;
	}
	
	public void add(AbstractFile file) {
	   fileList.add(file);	
	}
	
	public void remove(AbstractFile file) {
		fileList.remove(file);
	}
	
	public AbstractFile getChild(int i) {
		return (AbstractFile)fileList.get(i);
	}
	
	public void killVirus() {
		System.out.println("****对文件夹'" + name + "'进行杀毒");  //模拟杀毒
		
		//递归调用成员构件的killVirus()方法
		for(Object obj : fileList) {
			((AbstractFile)obj).killVirus();
		}
	}

```

```java
//葉子

//ImageFile
public class ImageFile extends AbstractFile {
	private String name;
	
	public ImageFile(String name) {
		this.name = name;
	}
	
	public void add(AbstractFile file) {
	   System.out.println("对不起，不支持该方法！");
	}
	
	public void remove(AbstractFile file) {
		System.out.println("对不起，不支持该方法！");
	}
	
	public AbstractFile getChild(int i) {
		System.out.println("对不起，不支持该方法！");
		return null;
	}
	
	public void killVirus() {
		//模拟杀毒
		System.out.println("----对图像文件'" + name + "'进行杀毒");
	}
}


//TextFile
public class TextFile extends AbstractFile {
	private String name;
	
	public TextFile(String name) {
		this.name = name;
	}
	
	public void add(AbstractFile file) {
	   System.out.println("对不起，不支持该方法！");
	}
	
	public void remove(AbstractFile file) {
		System.out.println("对不起，不支持该方法！");
	}
	
	public AbstractFile getChild(int i) {
		System.out.println("对不起，不支持该方法！");
		return null;
	}
	
	public void killVirus() {
		//模拟杀毒
		System.out.println("----对文本文件'" + name + "'进行杀毒");
	}
}

//VideoFile
public class VideoFile extends AbstractFile {
	private String name;
	
	public VideoFile(String name) {
		this.name = name;
	}
	
	public void add(AbstractFile file) {
	   System.out.println("对不起，不支持该方法！");
	}
	
	public void remove(AbstractFile file) {
		System.out.println("对不起，不支持该方法！");
	}
	
	public AbstractFile getChild(int i) {
		System.out.println("对不起，不支持该方法！");
		return null;
	}
	
	public void killVirus() {
		//模拟杀毒
		System.out.println("----对视频文件'" + name + "'进行杀毒");
	}
}
```

```java
//客戶端
public class Client {
	public static void main(String args[]) {
        //针对抽象构件编程
		AbstractFile file1,file2,file3,file4,file5,folder1,folder2,folder3,folder4;
		
		folder1 = new Folder("Sunny的资料");
		folder2 = new Folder("图像文件");
		folder3 = new Folder("文本文件");
		folder4 = new Folder("视频文件");
		
		file1 = new ImageFile("小龙女.jpg");
		file2 = new ImageFile("张无忌.gif");
		file3 = new TextFile("九阴真经.txt");
		file4 = new TextFile("葵花宝典.doc");
		file5 = new VideoFile("笑傲江湖.rmvb");

		folder2.add(file1);
		folder2.add(file2);
		folder3.add(file3);
		folder3.add(file4);
		folder4.add(file5);
		
		folder1.add(folder2);
		folder1.add(folder3);
		folder1.add(folder4);
		
        //从“Sunny的资料”结点开始进行杀毒操作
		folder1.killVirus();
	}
}
```



## 模式（模板）

### 介紹

### 結構

### 角色

### 實現
