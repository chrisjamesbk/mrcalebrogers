<?php
	// set up page variables
	$path = ".";
	$pagetitle = "";
	
    // insert header
	include($path."/_/php/header.php");
?>

    <header role="banner">
        <h1>Header</h1>
    </header>
    <div role="main">
        <p>This is just a paragraph</p>
        <ul>
            <li>this is an</li>
            <li>unordered</li>
            <li>list</li>
        </ul>
    </div>
    <footer>
        <p>Footer content</p>
    </footer>

    <?php
		// insert footer
		include($path."/_/php/footer.php");
	?>

</body>
</html>
