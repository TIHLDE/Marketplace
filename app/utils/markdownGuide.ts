

const markdownGuideText = `
*Markdown* er en vanlig måte å formatere tekst på nettet og brukes også på tihlde.org. Her følger en rekke eksempler på hvordan du kan legge inn overskrifter, lister, linker, bilder, osv. ved hjelp av vanlig Markdown.

___

## **Overskrifter**

# Stor overskrift
## Mindre overskrift

~~~
# Stor overskrift
## Mindre overskrift
~~~

___

## **Typografi**

**Fet tekst**
_Kursiv tekst_
_**Fet og kursiv tekst**_

~~~
**Fet tekst**
_Kursiv tekst_
_**Fet og kursiv tekst**_
~~~

___

## **Link og bilde**

[tihlde.org](https://tihlde.org)

![Casper Ruud](https://media.giphy.com/media/TxCW0uBo0CQp3nQCLc/giphy.gif)

~~~
Link:
[tihlde.org](https://tihlde.org)

Bilde:
![alternativ tekst](https://tihlde.org/image.jpg)
~~~

___

## **Liste**

Med tall:
1. Første element
2. Andre element
3. Tredje element

Uten tall:
- Første element
- Andre element
- Tredje element

~~~
Med tall:
1. Første element
2. Andre element
3. Tredje element

Uten tall:
- Første element
- Andre element
- Tredje element
~~~

___

## **Delelinje**

___

~~~
___
~~~`
;


export default markdownGuideText;