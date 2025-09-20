(function () {


    const Left = document.getElementById('DecolationRandomIcons_Left');
    const Right = document.getElementById('DecolationRandomIcons_Right')

    const IconData = [
        '🌸','🌳','🌱','🍨','🔥','💧','🌈','🍧',
        '🥦','🐕','🐶','🦄','🐽','🐘','🤩','🧊'
    ];

    const Iconlengh = IconData.length;

    function Random (num) {
        return Math.floor(Math.random() * num);
    }

    function ArryRandomIcons(){
        let R = Random(Iconlengh);
        const Icons = IconData[R];

        return Icons;
        //console.log(Id)
    }
    

    setInterval(function () {
        Left.innerHTML = ArryRandomIcons();
        Right.innerHTML = ArryRandomIcons();
    },1000)
}())